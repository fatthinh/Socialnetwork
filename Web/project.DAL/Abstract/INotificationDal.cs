using project.common.Core.Concrete;
using project.DAL.Entities;


namespace project.DAL.Abstract
{
    /// <summary>
    /// Represents a data access layer for the Notification entity.
    /// </summary>
    public interface INotificationDal : IEntityRepository<Notification>
    {
    }
}
