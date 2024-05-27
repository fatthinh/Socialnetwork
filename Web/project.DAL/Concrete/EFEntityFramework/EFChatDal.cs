using project.common.Core.Concrete.EntityFramework;
using project.DAL.Abstract;
using project.DAL.Entities;

namespace project.DAL.Concrete.EFEntityFramework
{
    /// <summary>
    /// Represents the Entity Framework implementation of the IChatDal interface.
    /// </summary>
    public class EFChatDal : EntityRepository<Chat, SocialNetworkDbContext>, IChatDal
    {
    }
}
