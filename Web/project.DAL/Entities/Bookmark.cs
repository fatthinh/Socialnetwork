using project.common.Core.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace project.DAL.Entities
{
    /// <summary>
    /// Represents a Like entity that implements the IEntity interface.
    /// </summary>
    public class Bookmark : IEntity
    {
        /// <summary>
        /// Gets or sets the ID of the like.
        /// </summary>
        public string? Id { get; set; }

        /// <summary>
        /// Gets or sets the ID of the post associated with the like.
        /// </summary>
        public string? PostId { get; set; }

        /// <summary>
        /// Gets or sets the post associated with the like.
        /// </summary>
        public virtual Post? Post { get; set; }

        /// <summary>
        /// Gets or sets the ID of the user who liked the post.
        /// </summary>
        public string? UserId { get; set; }

        /// <summary>
        /// Gets or sets the user who liked the post.
        /// </summary>
        public virtual User? User { get; set; }
    }
}
