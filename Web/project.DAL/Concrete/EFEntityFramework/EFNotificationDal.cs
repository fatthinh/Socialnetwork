using project.common.Core.Concrete.EntityFramework;
using project.DAL.Abstract;
using project.DAL.Entities;

namespace project.DAL.Concrete.EFEntityFramework
{
    /// <summary>
    /// Represents the Entity Framework implementation of the INotificationDal interface.
    /// </summary>
    public class EFNotificationDal : EntityRepository<Notification, SocialNetworkDbContext>, INotificationDal
    {
    }
}
