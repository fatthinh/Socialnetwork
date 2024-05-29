using project.BLL.Abstract;
using project.DAL.Abstract;
using project.DAL.Entities;

namespace project.BLL.Concrete
{
    /// <summary>
    /// Represents a service that handles bookmarks.
    /// </summary>
    public class BookmarkService : IBookmarkService
    {
        /// <summary>
        /// Private field representing the data access layer for managing bookmarks.
        /// </summary>
        private readonly IBookmarkDal _bookmarkDal;

        /// <summary>
        /// Initializes a new instance of the BookmarkService class with the specified bookmarkDal.
        /// </summary>
        /// <param name="bookmarkDal">The data access layer for handling bookmarks.</param>
        public BookmarkService(IBookmarkDal bookmarkDal)
        {
            _bookmarkDal = bookmarkDal;
        }

        // Add more methods and logic here for managing bookmarks.

        /// <summary>
        /// Adds a bookmark to a post asynchronously.
        /// </summary>
        /// <param name="bookmark">The bookmark object representing the bookmark to be added.</param>
        /// <returns>Task representing the asynchronous operation.</returns>
        public async Task AddBookmarkToPostAsync(Bookmark bookmark)
        {
            await _bookmarkDal.AddAsync(bookmark);
        }

        /// <summary>
        /// Deletes a bookmark asynchronously.
        /// </summary>
        /// <param name="bookmark">The bookmark object representing the bookmark to be deleted.</param>
        /// <returns>Task representing the asynchronous operation.</returns>
        public async Task DeleteBookmarkAsync(Bookmark bookmark)
        {
            await _bookmarkDal.DeleteAsync(bookmark);
        }

        /// <summary>
        /// Deletes all bookmarks associated with a user asynchronously.
        /// </summary>
        /// <param name="userId">The ID of the user whose bookmarks are to be deleted.</param>
        /// <returns>Task representing the asynchronous operation.</returns>
        public async Task DeleteUserBookmarksAsync(string userId)
        {
            var usersbookmarks = await _bookmarkDal.GetAllAsync(l => l.UserId == userId);

            if (usersbookmarks != null)
            {
                foreach (var userbookmark in usersbookmarks)
                {
                    await RemoveBookmarkAsync(userbookmark);
                }
            }
        }

        /// <summary>
        /// Retrieves the post IDs that a user has bookmarkd asynchronously.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <returns>A collection of strings representing the post IDs bookmarkd by the user.</returns>
        public async Task<IEnumerable<string?>> GetPostIdsUserBookmarkedAsync(string userId)
        {
            return (await _bookmarkDal.GetAllAsync(l => l.UserId == userId)).Select(e => e.PostId);
        }

        /// <summary>
        /// Retrieves the number of bookmarks for a post asynchronously.
        /// </summary>
        /// <param name="postId">The ID of the post.</param>
        /// <returns>The number of bookmarks for the post.</returns>
        public async Task<int> GetPostBookmarkCountAsync(string postId)
        {
            return (await _bookmarkDal.GetAllAsync(l => l.PostId == postId)).Count();
        }

        /// <summary>
        /// Retrieves all bookmarks for a post asynchronously.
        /// </summary>
        /// <param name="postId">The ID of the post.</param>
        /// <returns>A collection of bookmark objects representing the bookmarks for the post.</returns>
        public async Task<IEnumerable<Bookmark>> GetPostBookmarksAsync(string postId)
        {
            return await _bookmarkDal.GetAllAsync(l => l.PostId == postId);
        }

        /// <summary>
        /// Removes a bookmark asynchronously.
        /// </summary>
        /// <param name="bookmark">The bookmark object representing the bookmark to be removed.</param>
        /// <returns>Task representing the asynchronous operation.</returns>
        public async Task RemoveBookmarkAsync(Bookmark bookmark)
        {
            await _bookmarkDal.DeleteAsync(bookmark);
        }

        /// <summary>
        /// Removes a bookmark asynchronously based on the user ID and post ID.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <param name="postId">The ID of the post.</param>
        /// <returns>Task representing the asynchronous operation.</returns>
        public async Task RemoveBookmarkAsync(string userId, string postId)
        {
            var bookmark = await _bookmarkDal.GetAsync(l => l.UserId == userId && l.PostId == postId);
            await RemoveBookmarkAsync(bookmark);
        }

        /// <summary>
        /// Checks if a user has bookmarkd a post asynchronously.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <param name="postId">The ID of the post.</param>
        /// <returns>True if the user has bookmarkd the post; otherwise, false.</returns>
        public async Task<bool> UserBookmarkedPostAsync(string userId, string postId)
        {
            var result = await _bookmarkDal.GetAsync(l => l.UserId == userId && l.PostId == postId);
            return result != null;
        }
    }
}
