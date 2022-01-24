using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Lyncas.Repositories;
using Lyncas.Models;
using Lyncas.Data;
using Microsoft.Extensions.Configuration;
using System.Web.Http.Description;

namespace Lyncas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    //[RoutePrefix("api/books")]
    public class BooksController : ControllerBase
    {
        private BooksRepository favoritesRep;

        public BooksController(BooksRepository favoritesRep)
        {
            this.favoritesRep = favoritesRep;
        }

        [HttpGet]
        public async Task<dynamic> Get(string p)
        {
            try
            {
                return await favoritesRep.Get(p);
            }
            catch (Exception e) { return null; }

        }

        [HttpGet]
        [Route("favorites")]
        public async Task<dynamic> GetFavorites()
        {
            try
            {
                return await favoritesRep.GetFavorites();
            }
            catch (Exception e) { return null; }

        }

        [HttpPost]
        [Route("{id}/favorite")]
        public IActionResult Post(string id)
        {

            try
            {
                bool isAdded = favoritesRep.Post(id);

                if (isAdded)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(new { Message = "Error in add favorite book." });
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }


        [HttpDelete]
        [Route("{id}/favorite")]
        public IActionResult Delete(string id)
        {

            try
            {
                bool isAdded = favoritesRep.Delete(id);

                if (isAdded)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(new { Message = "Error in remove favorite book." });
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
    }
}
