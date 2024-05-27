using project.common.Core.Concrete.EntityFramework;
using project.DAL.Abstract;
using project.DAL.Entities;

namespace project.DAL.Concrete.EFEntityFramework
{
    /// <summary>
    /// Represents the Entity Framework implementation of the IFriendRequestDal interface.
    /// </summary>
    public class EFFriendRequestDal : EntityRepository<FriendRequest, SocialNetworkDbContext>, IFriendRequestDal
    {
    }
}
