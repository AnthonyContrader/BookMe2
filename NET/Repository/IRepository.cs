using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NET.Models;

namespace NET.Repository
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();

        T Read(int id);

        void Insert(T entity);

        void Delete(int id);

        void Update(T entity);

        void Save();

    }
}
