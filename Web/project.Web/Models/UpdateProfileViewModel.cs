namespace project.Web.Models
{
    /// <summary>
    /// Represents a view model for updating user profile information.
    /// </summary>
    public class UpdateProfileViewModel
    {
        /// <summary>
        /// Gets or sets the media file for the user's profile picture.
        /// </summary>
        public IFormFile? MediaFile { get; set; }
    }
}