using project.DAL.Entities;

namespace project.Web.Models
{
    /// <summary>
    /// Represents a view model for sending messages.
    /// </summary>
    public class SendMessageViewModel
    {
        /// <summary>
        /// Gets or sets the message to be sent.
        /// </summary>
        public Message? Message { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this is the first message sent in the conversation.
        /// </summary>
        public bool FirstMessageSent { get; set; }
    }
}