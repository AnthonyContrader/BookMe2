using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace NET.Models
{



    public class User
    {
        public long id { get; set;  }
        public String username { get; set; }
        public String password { get; set; }
        public String login { get; set; }
        public String email { get; set; }
        public Authorities authorities { get; set; }
    }

    

}
