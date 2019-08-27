using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Consul;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace NET.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    //[ApiController]
    public class ValuesController : Controller
    {

        private Func<IConsulClient> _consulClientFactory;

        public ValuesController(Func<IConsulClient> consulClientFactory)
        {
            _consulClientFactory = consulClientFactory;
        }

        // GET api/values
        [HttpGet]
        public async Task<IEnumerable<string>> Get()
        {
            using (var client = _consulClientFactory())
            {
                var queryResult = await client.KV.List("NET-ID-");
                if(queryResult.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    List<string> finalResults = new List<string>();
                    foreach(var matchedPair in queryResult.Response)
                    {
                        finalResults.Add(Encoding.UTF8.GetString(matchedPair.Value, 0, matchedPair.Value.Length));
                    }
                    return finalResults;
                }
                return new string[0];
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<string> Get(int id)
        {
            using(var client = _consulClientFactory())
            {
                var getPair = await client.KV.Get($"NET-ID-{id.ToString()}");
                return Encoding.UTF8.GetString(getPair.Response.Value, 0, getPair.Response.Value.Length);
            }
        }

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] JObject jsonData)
        {
            using(var client = _consulClientFactory())
            {
                var jsonValue = jsonData["Value"].ToString();
                var putPair = new KVPair($"NET-ID-{id.ToString()}")
                {
                    Value = Encoding.UTF8.GetBytes(jsonValue)
                };
                await client.KV.Put(putPair);
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            using(var client = _consulClientFactory())
            {
                await client.KV.Delete($"NET-ID-{id.ToString()}");
            }
        }
    }
}
