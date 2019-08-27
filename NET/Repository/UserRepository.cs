using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NET.DBContexts;
using NET.Models;
using Microsoft.EntityFrameworkCore;

namespace NET.Repository
{
    public class UserRepository : AbstractRepository<User>
    {

        public UserRepository(bookmeDB dbContext) : base(dbContext)
        {

        }
    }
}
