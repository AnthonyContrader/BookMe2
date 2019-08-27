using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NET.Models;
using NET.Repository;

namespace NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IRepository<User> _repository;

        public UserController(IRepository<User> repository)
        {
            _repository = repository;
        }

        // GET: api/User
        [HttpGet]
        public IActionResult Get()
        {
            var users = _repository.GetAll();
            return new OkObjectResult(users);
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var user = _repository.Read(id);
            return new OkObjectResult(user);
        }

        // POST: api/User
        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            using (var scope = new TransactionScope()){
                _repository.Insert(user);
                scope.Complete();
                return CreatedAtAction(nameof(Get), new { id = user.id }, user);
            }
        }

        // PUT: api/User
        [HttpPut]
        public IActionResult Put([FromBody] User user)
        {
            if(user != null)
            {
                using (var scope = new TransactionScope())
                {
                    _repository.Update(user);
                    scope.Complete();
                    return new OkResult();
                }
            }
            return new NoContentResult();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _repository.Delete(id);
            return new OkResult();
        }
    }
}
