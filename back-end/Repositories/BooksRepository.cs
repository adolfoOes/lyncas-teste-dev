using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Lyncas.Data;
using Lyncas.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Dynamic;

namespace Lyncas.Repositories
{
    public class BooksRepository
    {
        public IConfiguration _configuration { get; }
        private readonly DbContextPostGree _context;
        private readonly IHttpClientFactory _clientFactory;

        public BooksRepository(DbContextPostGree context, IHttpClientFactory clientFactory, IConfiguration configuration)
        {
            _context = context;
            _clientFactory = clientFactory;
            _configuration = configuration;
        }

        public async Task<dynamic> Get(string p)
        {

            try
            {

                var url = _configuration.GetSection("ExternalConnections").GetSection("GoogleAPI").Value;
                url = url + "volumes?q=" + p;

                var request = new HttpRequestMessage(HttpMethod.Get, url);
                request.Headers.Add("Accept", "application/json; charset=UTF-8");
                request.Headers.Add("User-Agent", "HttpClientFactory-Sample");

                var client = _clientFactory.CreateClient();

                var response = await client.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    var finalData = await response.Content.ReadAsStringAsync();
                    dynamic _dataResponse = JsonConvert.DeserializeObject<ExpandoObject>(finalData);

                    return _dataResponse;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public async Task<dynamic> GetFavorites()
        {

            try
            {
                var client = _clientFactory.CreateClient();
                List<string> favoriteIds = _context.Favorites.Select(x => x.BookID).ToList();

                var url = _configuration.GetSection("ExternalConnections").GetSection("GoogleAPI").Value;
                url = url + "volumes/" ;

                List<dynamic> favorites = new List<dynamic>(); 

                foreach (string id in favoriteIds) {

                    var request = new HttpRequestMessage(HttpMethod.Get, url+ id);
                    request.Headers.Add("Accept", "application/json; charset=UTF-8");
                    request.Headers.Add("User-Agent", "HttpClientFactory-Sample");

                    var response = await client.SendAsync(request);

                    if (response.IsSuccessStatusCode)
                    {
                        var finalData = await response.Content.ReadAsStringAsync();
                        dynamic _dataResponse = JsonConvert.DeserializeObject<ExpandoObject>(finalData);

                        favorites.Add(_dataResponse);
                    }
                }

                dynamic returnObj = new ExpandoObject();

                returnObj.kind = "";
                returnObj.totalItems = favorites.Count();
                returnObj.items = favorites;

                return returnObj;
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public bool Post(string id)
        {
            try
            {

                Favorites favExists = _context.Favorites.Where(x => x.BookID.ToUpper().TrimStart().TrimEnd() == id.ToUpper().TrimStart().TrimEnd()).FirstOrDefault();

                if (favExists == null)
                {
                    Favorites newFav = new Favorites() { BookID = id };
                    _context.Favorites.Add(newFav);
                    _context.SaveChanges();
                }
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool Delete(string id)
        {
            try
            {
                Favorites favExists = _context.Favorites.Where(x => x.BookID.ToUpper().TrimStart().TrimEnd() == id.ToUpper().TrimStart().TrimEnd()).FirstOrDefault();

                if (favExists != null)
                {
                    _context.Favorites.Remove(favExists);
                    _context.SaveChanges();

                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
