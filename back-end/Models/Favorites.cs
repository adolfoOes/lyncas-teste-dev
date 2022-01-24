using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Lyncas.Models
{
    public class Favorites
    {
        [Key]
        public string BookID { get; set; }

    }
}
