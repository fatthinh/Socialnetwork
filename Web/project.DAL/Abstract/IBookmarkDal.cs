using project.common.Core.Concrete;
using project.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace project.DAL.Abstract
{
    /// <summary>
    /// Represents a data access layer for the Bookmark entity.
    /// </summary>
    public interface IBookmarkDal : IEntityRepository<Bookmark>
    {
    }
}
