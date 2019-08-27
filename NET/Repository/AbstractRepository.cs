using Microsoft.EntityFrameworkCore;
using NET.DBContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NET.Repository
{
    public class AbstractRepository<T> : IRepository<T> where T : class
    {

        private readonly bookmeDB _dbContext;

        public AbstractRepository(bookmeDB dbContext)
        {
            _dbContext = dbContext;
        }

        public void Delete(int id)
        {
            var t = _dbContext.Set<T>().Find(id);
            _dbContext.Set<T>().Remove(t);
            Save();
        }

        public IEnumerable<T> GetAll()
        {
            return _dbContext.Set<T>().ToList<T>();
        }

        public void Insert(T entity)
        {
            _dbContext.Set<T>().Add(entity);
            Save();
        }

        public T Read(int id)
        {
            return _dbContext.Set<T>().Find(id);
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void Update(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            Save();
        }
    }
}
