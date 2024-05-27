using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.BLL.Abstract;
using project.DAL.Entities;
using project.Web.Abstract;
using project.Web.DTOs;
using project.Web.Helpers.ConstantHelpers;
using project.Web.Helpers.Utilities;
using System.Security.Claims;

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
        //private readonly IMediaService _mediaService;

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
                              //IMediaService mediaService,
                              IMapper mapper,
                              IHttpContextAccessor httpContextAccessor)
        {
            _userService = userService;

            _friendshipService = friendshipService;

            _friendRequestService = friendRequestService;

            //_mediaService = mediaService;

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
                var userName = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userService.GetUserByUsernameAsync(userName);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}