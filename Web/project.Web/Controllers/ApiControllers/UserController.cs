using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.BLL.Abstract;
using project.DAL.Entities;
using project.Web.Abstract;
using project.Web.Concrete;
using project.Web.DTOs;
using project.Web.Helpers.ConstantHelpers;
using project.Web.Helpers.Utilities;
using project.Web.Models;
using System.Security.Claims;
using static System.Net.Mime.MediaTypeNames;

namespace project.Web.Controllers.ApiControllers
{
    /// <summary>
    /// Controller for managing users.
    /// </summary>
    [Route(Routes.UserController)]
    [ApiController]
    public class UserController : ControllerBase
    {
        /// <summary>
        /// The user service used for user-related operations.
        /// </summary>
        private readonly IUserService _userService;

        /// <summary>
        /// The friendship service used for friendship-related operations.
        /// </summary>
        private readonly IFriendshipService _friendshipService;

        /// <summary>
        /// The friend request service used for friend request-related operations.
        /// </summary>
        private readonly IFriendRequestService _friendRequestService;

        /// <summary>
        /// The media service used for media-related operations.
        /// </summary>
        private readonly IMediaService _mediaService;

        /// <summary>
        /// The mapper used for object mapping.
        /// </summary>
        private readonly IMapper _mapper;

        private readonly IHttpContextAccessor _httpContextAccessor;

        /// <summary>
        /// Initializes a new instance of the UserController class.
        /// </summary>
        /// <param name="userService">The user service used for user-related operations.</param>
        /// <param name="friendshipService">The friendship service used for friendship-related operations.</param>
        /// <param name="friendRequestService">The friend request service used for friend request-related operations.</param>
        /// <param name="mediaService">The media service used for media-related operations.</param>
        /// <param name="mapper">The mapper used for object mapping.</param>
        public UserController(IUserService userService,
                              IFriendshipService friendshipService,
                              IFriendRequestService friendRequestService,
                              IMediaService mediaService,
                              IMapper mapper,
                              IHttpContextAccessor httpContextAccessor)
        {
            _userService = userService;

            _friendshipService = friendshipService;

            _friendRequestService = friendRequestService;

            _mediaService = mediaService;

            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        // <summary>
        /// Retrieves the current user's profile.
        /// </summary>
        /// <returns>The profile of the current user.</returns>
        [HttpGet(Routes.GetCurrentUser)]
        [Authorize]
        public async Task<ActionResult<User?>> GetCurrentUser()
        {
            try
            {
                //var userName = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var currentUserId = await UserHelper.GetCurrentUserAsync(_httpContextAccessor);
                var user = await _userService.GetUserByIdAsync(currentUserId);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Updates the current user's profile image with the provided media file.
        /// </summary>
        /// <param name="model">The model containing the media file and user ID.</param>
        /// <returns>An action result indicating the success or failure of the update operation.</returns>
        [HttpPost(Routes.UpdateProfileImage)]
        [Authorize]
        public async Task<IActionResult> UpdateProfileImage([FromForm] UpdateProfileViewModel model)
        {
            try
            {
                var imageFile = model.MediaFile;
                var currentUserId = await UserHelper.GetCurrentUserAsync(_httpContextAccessor);

                // Check if the file and userId exist and are valid
                if (imageFile != null && imageFile.Length > 0 && !string.IsNullOrEmpty(currentUserId))
                {
                    var mediaUrl = await _mediaService.UploadMediaAsync(imageFile);

                    if (mediaUrl != string.Empty)
                    {
                        var user = await _userService.GetUserByIdAsync(currentUserId);

                        if (user != null)
                        {
                            user.ImageUrl = mediaUrl;

                            await _userService.UpdateAsync(user);

                            return Ok();
                        }

                        return NotFound(Errors.UserNotFound);
                    }

                    return BadRequest(Errors.ImageUploadError);
                }

                return BadRequest(Errors.InvalidRequestData);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Retrieves a list of user profiles that match the specified text.
        /// </summary>
        /// <param name="text">The text to search for in the user profiles.</param>
        /// <returns>A list of user profiles that match the specified text.</returns>
        [HttpGet("GetUsersByText")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsersByText(string search)
        {
            try
            {
                var currentUserId = await UserHelper.GetCurrentUserAsync(_httpContextAccessor);
                var users = await _userService.GetAllUsersOtherThanAsync(currentUserId);

                var filteredUsers = users.Where(u => u.UserName.ToLower().Contains(search.ToLower()));

                var userDTOs = _mapper.Map<List<UserDTO>>(filteredUsers);

                //userDTOs.ForEach(async user =>
                //{
                //    user.IsFriend = await _friendshipService.IsFriendAsync(currentUser.Id, user.Id);

                //    if (!user.IsFriend)
                //    {
                //        user.HasFriendRequestPending = await _friendRequestService.HasRequestPendingAsync(currentUser.Id, user.Id, Status.Pending);
                //    }
                //});

                return Ok(userDTOs.Take(10));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Retrieves a list of users that the specified user is following.
        /// </summary>
        /// <param name="userId">The ID of the user whose followings are to be retrieved.</param>
        /// <returns>A list of users that the specified user is following.</returns>
        [HttpGet(Routes.GetFollowings)]
        public async Task<ActionResult<IEnumerable<User>>> GetFollowings()
        {
            try
            {
                var currentUserId = await UserHelper.GetCurrentUserAsync(_httpContextAccessor);
                var followings = await _friendshipService.GetAllFollowingsOfUserAsync(currentUserId);

                return Ok(followings.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}