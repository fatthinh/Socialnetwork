using project.common.Core.Concrete;
using project.DAL.Entities;


namespace project.DAL.Abstract
{
    /// <summary>
    /// Represents a data access layer for the FriendRequest entity.
    /// </summary>
    public interface IFriendRequestDal : IEntityRepository<FriendRequest>
    {
    }
}
