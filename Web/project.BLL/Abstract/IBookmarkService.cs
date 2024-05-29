using project.DAL.Entities;

namespace project.BLL.Abstract
{
    /// <summary>
    /// Interface for managing bookmark-related operations, such as adding and removing bookmarks to/from posts,
    /// retrieving post bookmark count, checking if a user bookmarkd a post, and deleting user bookmarks.
    /// </summary>
    public interface IBookmarkService
    {
        /// <summary>
        /// Retrieves the bookmark count of a post asynchronously.
        /// </summary>
        /// <param name="postId">The ID of the post whose bookmark count will be retrieved.</param>
        /// <returns>The number of bookmarks for the specified post.</returns>
        Task<int> GetPostBookmarkCountAsync(string postId);

        /// <summary>
        /// Adds a new bookmark to a post asynchronously.
        /// </summary>
        /// <param name="bookmark">The bookmark object to be added.</param>
        /// <returns>Task representing the asynchronous operation.</returns>
        Task AddBookmarkToPostAsync(Bookmark bookmark);

        /// <summary>
        /// Retrieves the IDs of the posts that a user bookmarkd asynchronously.
        /// </summary>
        /// <param name="userId">The ID of the user whose bookmarkd posts will be retrieved.</param>
        /// <returns>A collection of strings representing the IDs of the posts that the user bookmarkd.</returns>
        Task<IEnumerable<string>> GetPostIdsUserBookmarkedAsync(string userId);

        /// <summary>
        /// Removes a bookmark from a post asynchronously.
        /// </summary>
        /// <param name="bookmark">The bookmark object to be removed.</param>
        /// <returns>Task representing the asynchronous operation.</returns>
        Task RemoveBookmarkAsync(Bookmark bookmark);

        /// <summary>
        /// Removes a bookmark from a post asynchronously based on the user ID and post ID.
        /// </summary>
        /// <param name="userId">The ID of the user who bookmarkd the post.</param>
        /// <param name="postId">The ID of the post from which the bookmark will be removed.</param>
        /// <returns>Task representing the asynchronous operation.</returns>
        Task RemoveBookmarkAsync(string userId, string postId);

        /// <summary>
        /// Checks if a user bookmarkd a post asynchronously.
        /// </summary>
        /// <param name="userId">The ID of the user whose bookmark will be checked.</param>
        /// <param name="postId">The ID of the post to be checked for a bookmark.</param>
        /// <returns>True if the user bookmarkd the post; otherwise, false.</returns>
        Task<bool> UserBookmarkedPostAsync(string userId, string postId);

        /// <summary>
        /// Deletes all bookmarks of a user asynchronously.
        /// </summary>
        /// <param name="userId">The ID of the user whose bookmarks will be deleted.</param>
        /// <returns>Task representing the asynchronous operation.</returns>
        Task DeleteUserBookmarksAsync(string userId);

        /// <summary>
        /// Retrieves all bookmarks of a post asynchronously.
        /// </summary>
        /// <param name="postId">The ID of the post whose bookmarks will be retrieved.</param>
        /// <returns>A collection of bookmark objects representing the bookmarks of the post.</returns>
        Task<IEnumerable<Bookmark>> GetPostBookmarksAsync(string postId);

        /// <summary>
        /// Deletes a bookmark asynchronously.
        /// </summary>
        /// <param name="bookmark">The bookmark object to be deleted.</param>
        /// <returns>Task representing the asynchronous operation.</returns>
        Task DeleteBookmarkAsync(Bookmark bookmark);
    }
}
