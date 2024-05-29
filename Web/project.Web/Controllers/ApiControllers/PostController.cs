using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.BLL.Abstract;
using project.BLL.Concrete;
using project.DAL.Entities;
using project.Web.Abstract;
using project.Web.Helpers.ConstantHelpers;
using project.Web.Helpers.Utilities;
using project.Web.Models;
using System.Security.Claims;

namespace project.Web.Controllers.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        /// <summary>
        /// The service responsible for handling media-related operations.
        /// </summary>
        private readonly IMediaService _mediaService;

        /// <summary>
        /// The service responsible for handling post-related operations.
        /// </summary>
        private readonly IPostService _postService;

        /// <summary>
        /// The service responsible for handling user-related operations.
        /// </summary>
        private readonly IUserService _userService;

        /// <summary>
        /// The service responsible for handling comment-related operations.
        /// </summary>
        private readonly ICommentService _commentService;

        /// <summary>
        /// The service responsible for handling notification-related operations.
        /// </summary>
        private readonly INotificationService _notificationService;

        /// <summary>
        /// The service responsible for handling friendship-related operations.
        /// </summary>
        private readonly IFriendshipService _friendshipService;

        private readonly IHttpContextAccessor _httpContextAccessor;


        /// <summary>
        /// Initializes a new instance of the PostController class with the specified services.
        /// </summary>
        /// <param name="mediaService">The service for handling media-related operations.</param>
        /// <param name="postService">The service for handling post-related operations.</param>
        /// <param name="userService">The service for handling user-related operations.</param>
        /// <param name="commentService">The service for handling comment-related operations.</param>
        /// <param name="notificationService">The service for handling notification-related operations.</param>
        /// <param name="friendshipService">The service for handling friendship-related operations.</param>
        public PostController(IPostService postService, IUserService userService, ICommentService commentService, INotificationService notificationService, IFriendshipService friendshipService, IMediaService mediaService, IHttpContextAccessor httpContextAccessor)
        {
            _postService = postService;

            _userService = userService;

            _commentService = commentService;

            _notificationService = notificationService;

            _friendshipService = friendshipService;

            _mediaService = mediaService;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Gets all posts for the news feed of the current user.
        /// </summary>
        [HttpGet(Routes.GetAllPosts)]
        public async Task<ActionResult<IEnumerable<User>>> GetAllPosts()
        {
            try
            {
                var currentUserId = await UserHelper.GetCurrentUserAsync(_httpContextAccessor);

                var posts = await _postService.GetRandomPostsForNewsFeedAsync(currentUserId);

                return Ok(posts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Retrieves a post by id.
        /// </summary>
        [HttpGet("GetPostById")]
        public async Task<ActionResult<IEnumerable<User>>> GetPostById(string postId)
        {
            try
            {
                var post = await _postService.GetPostByIdAsync(postId);
                var ownerId = post.UserId;
                var owner = await _userService.GetUserByIdAsync(ownerId);
                post.User = owner;

                return Ok(post);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Retrieves all comments of a specific post by its post ID.
        /// </summary>
        /// <param name="postId">The ID of the post whose comments to retrieve.</param>
        /// <returns>An action result containing the list of comments belonging to the post.</returns>
        [HttpGet(Routes.GetCommentsOfPost)]
        public async Task<ActionResult<IEnumerable<Comment>>> GetAllCommentsOfPost(string postId)
        {
            try
            {
                var comments = (await _commentService.GetCommentsOfPostAsync(postId)).ToList();

                comments.ForEach(async comment =>
                {
                    comment.User = await _userService.GetUserByIdAsync(comment.UserId);
                });

                return Ok(comments);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Adds a new comment to a specific post by its post ID.
        /// </summary>
        /// <param name="model">The input model containing comment details.</param>
        /// <returns>An action result containing the newly added comment and related notification.</returns>
        [HttpPost(Routes.AddComment)]
        [Authorize]
        public async Task<ActionResult<Comment>> AddComment([FromBody] CommentInputModel model)
        {
            try
            {
                var currentUserId = await UserHelper.GetCurrentUserAsync(_httpContextAccessor);
                var post = await _postService.GetPostByIdAsync(model.PostId);

                if (post == null)
                {
                    return NotFound();
                }

                var comment = new Comment
                {
                    Id = Guid.NewGuid().ToString(),

                    Text = model.Text,

                    UserId = currentUserId,

                    PostId = model.PostId
                };

                await _commentService.AddAsync(comment);

                //var currentUser = await _userService.GetUserByIdAsync(model.UserId);

                //var notification = new Notification()
                //{
                //    Id = Guid.NewGuid().ToString(),

                //    Date = DateTime.Now,

                //    IsRead = false,

                //    FromUserId = currentUser.Id,

                //    FromUser = currentUser,

                //    ToUserId = post.UserId,

                //    ToUser = await _userService.GetUserByIdAsync(post.UserId),

                //    Message = NotificationType.GetCommentedOnYourPostMessage(currentUser.UserName),
                //};

                //await _notificationService.AddAsync(notification);

                //comment.User = await _userService.GetUserByIdAsync(model.UserId);

                //var vm = new CommentNotificationViewModel()
                //{
                //    Notification = notification,

                //    Comment = comment
                //};

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        /// <summary>
        /// Creates a new post and adds it to the database.
        /// </summary>
        /// <param name="model">The view model containing the post details.</param>
        [HttpPost(Routes.CreatePost)]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromForm] CreatePostViewModel model)
        {
            try
            {
                IFormFile? mediaFile = model.MediaFile;

                var currentUserId = await UserHelper.GetCurrentUserAsync(_httpContextAccessor);

                var post = new Post()
                {
                    Id = Guid.NewGuid().ToString(),

                    CreatedAt = DateTime.Now,

                    Description = model.Description,

                    UserId = currentUserId
                };

                // If mediaFile is null, it mean post does not have an image
                if (mediaFile == null)
                {
                    post.ContentUrl = Constants.NoContentImageUrl;

                    post.HasMediaContent = false;

                    post.IsVideo = false;

                    await _postService.AddPostAsync(post);
                }
                else
                {
                    var mediaUrl = await _mediaService.UploadMediaAsync(mediaFile);

                    if (mediaUrl != string.Empty)
                    {
                        var isVideoFile = _mediaService.IsVideoFile(mediaFile);

                        post.ContentUrl = mediaUrl;

                        post.HasMediaContent = true;

                        post.IsVideo = isVideoFile;

                        await _postService.AddPostAsync(post);
                    }
                    else
                    {
                        return BadRequest(Errors.ImageUploadError);
                    }
                }
                post.User = await _userService.GetUserByIdAsync(post.UserId);

                // Send notification to all followers
                //var followers = await _friendshipService.GetAllFollowersOfUserAsync(currentUser.Id);

                //foreach (var follower in followers)
                //{
                //    var notification = new Notification()
                //    {
                //        Id = Guid.NewGuid().ToString(),

                //        Date = DateTime.Now,

                //        FromUserId = currentUser.Id,

                //        ToUserId = follower.Id,

                //        IsRead = false,

                //        Message = NotificationType.GetSharedPostMessage(currentUser.UserName)
                //    };

                //    await _notificationService.AddAsync(notification);
                //}

                return Ok(post);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Retrieves all posts of a specific user by token.
        /// </summary>
        /// <returns>An action result containing the list of posts belonging to the user.</returns>
        [HttpGet(Routes.GetAllPostsOfUser)]
        [Authorize]
        public async Task<ActionResult<IEnumerable<User>>> GetAllPostsOfUser()
        {
            try
            {
                var currentUserId = await UserHelper.GetCurrentUserAsync(_httpContextAccessor);
                var posts = await _postService.GetAllPostsOfUserAsync(currentUserId);

                return Ok(posts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Delete a post of a specific user by their post ID.
        /// </summary>
        /// <param name="userId">The ID of the user whose posts to retrieve.</param>
        /// <returns>An action result containing the list of posts belonging to the user.</returns>
        [HttpDelete("deletePost")]
        [Authorize]
        public async Task<ActionResult> DeleteMyPost(string postId)
        {
            try
            {
                await _postService.DeleteUserPostAsync(postId);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Edit a post of a specific user by their post ID.
        /// </summary>
        /// <param name="userId">The ID of the user whose posts to retrieve.</param>
        /// <returns>An action result containing the list of posts belonging to the user.</returns>
        [HttpPut("editPost")]
        [Authorize]
        public async Task<ActionResult> EditMyPost([FromBody] CreatePostViewModel model, string postId)
        {
            try
            {
                await _postService.EditPostAsync(postId, model.Description);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
