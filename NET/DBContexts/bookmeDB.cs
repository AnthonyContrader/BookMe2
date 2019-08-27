using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NET.Models;

namespace NET.DBContexts
{
    public class bookmeDB: DbContext
    {
        public bookmeDB(DbContextOptions<bookmeDB> options) : base(options)
        {
        }
        public DbSet<User> User { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    id = 1,
                    username = "admin",
                    password = "admin",
                    email = "admin@localhost",
                    authorities = Authorities.ROLE_ADMIN,
                },
                new User
                {
                    id = 2,
                    username = "system",
                    password = "system",
                    email = "system@localhost",
                    authorities = Authorities.ROLE_ADMIN,
                },
                new User
                {
                    id = 3,
                    username = "user",
                    password = "user",
                    email = "user@localhost",
                    authorities = Authorities.ROLE_USER,
                }

            );

            
        }
    }
}
    

