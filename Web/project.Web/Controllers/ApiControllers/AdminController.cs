using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.BLL.Abstract;
using project.DAL.Entities;
using project.Web.Abstract;
using project.Web.Helpers.ConstantHelpers;
using project.Web.Helpers.Utilities;
using project.Web.Models;

namespace project.Web.Controllers.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        /// <summary>
        /// The service responsible for handling post-related operations.
        /// </summary>
        private readonly IPostService _postService;

        /// <summary>
        /// The service responsible for handling user-related operations.
        /// </summary>
        private readonly IUserService _userService;


        private readonly IHttpContextAccessor _httpContextAccessor;


        /// <summary>
        /// Initializes a new instance of the PostController class with the specified services.
        /// </summary>
        /// <param name="postService">The service for handling post-related operations.</param>
        /// <param name="userService">The service for handling user-related operations.</param>
        public AdminController(IPostService postService, IUserService userService, IHttpContextAccessor httpContextAccessor)
        {
            _postService = postService;

            _userService = userService;

            _httpContextAccessor = httpContextAccessor;
        }


        [HttpGet("PostManagement")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Post>>> PostManagement(int page, DateTime startDate, DateTime endDate)
        {
            try
            {
                var posts = await _postService.GetPostsInPageAsync(page, startDate, endDate);

                return Ok(posts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Dashboard")]
        [Authorize]
        public async Task<ActionResult> Dashboard()
        {
            try
            {
                var posts = await _postService.GetAllPostsAsync();
                var users = await _userService.GetAllUsersAsync();

                return Ok(new { PostCount = posts.Count(), UserCount = users.Count() });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
