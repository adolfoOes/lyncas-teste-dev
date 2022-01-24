using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lyncas.Models;

namespace Lyncas.Data
{
    public class DbContextPostGree : DbContext
    {
        public DbSet<Favorites> Favorites { get; set; }
        public DbContextPostGree(DbContextOptions<DbContextPostGree> options) : base(options)
        {
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");
            base.OnModelCreating(modelBuilder);
        }

    }

}
