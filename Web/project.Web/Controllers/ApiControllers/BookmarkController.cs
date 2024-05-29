using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project.BLL.Abstract;
using project.BLL.Concrete;
using project.DAL.Entities;
using project.Web.Helpers.ConstantHelpers;
using project.Web.Helpers.Utilities;

namespace project.Web.Controllers.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        /// <summary>
        /// The service responsible for handling like-related operations.
        /// </summary>
        private readonly IBookmarkService _bookmarkService;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public BookmarkController(IBookmarkService bookmarkService, IHttpContextAccessor httpContextAccessor)
        {
            _bookmarkService = bookmarkService;


            _httpContextAccessor = httpContextAccessor;
        }


        /// <summary>
        /// Gets the post IDs that the user has bookmarked.
        /// </summary>
        /// <returns>A list of post IDs that the user has bookmarked.</returns>
        [HttpGet("GetPostIdsBookmarked")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<string>>> GetPostsIdsLikeByUser()
        {
            try
            {
                var currentUserId = await UserHelper.GetCurrentUserAsync(_httpContextAccessor);
                var ids = await _bookmarkService.GetPostIdsUserBookmarkedAsync(currentUserId);

                return Ok(ids);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Bookmarks a post with the specified ID.
        /// </summary>
        /// <param name="postId">The ID of the post to be bookmarked.</param>
        /// <returns>The updated number of bookmarks for the post.</returns>
        [HttpPost("BookmarkPost")]
        public async Task<ActionResult<IEnumerable<string>>> BookmarkPost(string postId)
        {
            try
            {
                var currentUserId = await UserHelper.GetCurrentUserAsync(_httpContextAccessor);

                if (currentUserId == null)
                {
                    return NotFound(Errors.UserNotFound);
                }

                var bookmark = new Bookmark()
                {
                    Id = Guid.NewGuid().ToString(),

                    PostId = postId,

                    UserId = currentUserId
                };

                await _bookmarkService.AddBookmarkToPostAsync(bookmark);

                //var toUser = await _postService.GetOwnerOfPostByIdAsync(postId);

                //var notification = new Notification()
                //{
                //    Id = Guid.NewGuid().ToString(),

                //    Date = DateTime.Now,

                //    IsRead = false,

                //    FromUserId = currentUser.Id,

                //    ToUser = toUser,

                //    ToUserId = toUser.Id,

                //    Message = NotificationType.GetLikedYourPostMessage(currentUser.UserName),
                //};

                //await _notificationService.AddAsync(notification);

                var ids = await _bookmarkService.GetPostIdsUserBookmarkedAsync(currentUserId);
                return Ok(ids);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Unlikes a post with the specified ID.
        /// </summary>
        /// <param name="postId">The ID of the post to be unbookmarked.</param>
        /// <returns>The updated number of bookmarkes for the post.</returns>
        [HttpPost("UnbookmarkPost")]
        [Authorize]
        public async Task<ActionResult<int?>> UnlikePost(string postId)
        {
            try
            {
                var currentUserId = await UserHelper.GetCurrentUserAsync(_httpContextAccessor);

                if (currentUserId == null)
                {
                    return NotFound(Errors.UserNotFound);
                }

                await _bookmarkService.RemoveBookmarkAsync(currentUserId, postId);

                var ids = await _bookmarkService.GetPostIdsUserBookmarkedAsync(currentUserId);
                return Ok(ids);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Checks if a user has bookmarked a specific post.
        /// </summary>
        /// <param name="userId">The ID of the user to check if they have bookmarked the post.</param>
        /// <param name="postId">The ID of the post to check if the user has bookmarked.</param>
        /// <returns>True if the user has bookmarked the post, false otherwise.</returns>
        [HttpGet("UserBookmarkedPost")]
        [Authorize]
        public async Task<ActionResult<bool>> UserbookmarkedPost(string postId)
        {
            try
            {
                var currentUserId = await UserHelper.GetCurrentUserAsync(_httpContextAccessor);
                var result = await _bookmarkService.UserBookmarkedPostAsync(currentUserId, postId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
