using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using project.BLL.Abstract;
using project.BLL.Concrete;
using project.common.Response;
using project.DAL.Entities;
using project.Web.Abstract;
using project.Web.DTOs;
using project.Web.Helpers.ConstantHelpers;
using project.Web.Helpers.Utilities;
using project.Web.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace project.Web.Controllers.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        /// <summary>
        /// Gets the manager for user sign-in functionality.
        /// </summary>
        private readonly SignInManager<User> _signInManager;

        /// <summary>
        /// The user manager component used for managing user-related operations.
        /// </summary>
        private readonly UserManager<User> _userManager;

        /// <summary>
        /// The role manager component used for managing roles.
        /// </summary>
        private readonly RoleManager<project.DAL.Entities.Role> _roleManager;

        /// <summary>
        /// The IUserService component used for user-related operations.
        /// </summary>
        private readonly IUserService _userService;


        /// <summary>
        /// The service responsible for handling static content and data.
        /// </summary>
        private readonly IStaticService _staticService;


        private readonly IConfiguration _configuration;
        /// <summary>
        /// Initializes a new instance of the AuthenticationController class with the specified services and managers.
        /// </summary>
        /// <param name="signInManager">The manager for handling sign-in operations for users.</param>
        /// <param name="userManager">The manager for handling user-related operations.</param>
        /// <param name="roleManager">The manager for handling role-related operations.</param>
        /// <param name="userService">The service for handling user-related operations.</param>
        /// <param name="staticService">The service for handling static content and data.</param>
        public AuthenticationController(SignInManager<User> signInManager,
                                        UserManager<User> userManager,
                                        RoleManager<project.DAL.Entities.Role> roleManager,
                                        IUserService userService,
                                        IStaticService staticService, IConfiguration configuration)
        {
            _signInManager = signInManager;

            _userManager = userManager;

            _roleManager = roleManager;

            _userService = userService;

            _staticService = staticService;

            _configuration = configuration;
        }


        /// <summary>
        /// Handles the registration process for a new user.
        /// </summary>
        /// <param name="model">The RegisterViewModel containing the user's registration details.</param>
        /// <returns>The appropriate ActionResult based on the registration result.</returns>
        [HttpPost(Routes.Register)]
        public async Task<SingleResponse> Register(RegisterViewModel model)
        {
            if (await _userService.UsernameIsTakenAsync(model.Username))
            {
                return new SingleResponse("This username was exist!");
            }

            // Create a new User object and populate its properties
            var filePath = Path.Combine(FileConstants.FilesFolderPath, FileConstants.CoversFile);

            var user = new User
            {
                UserName = model.Username.Trim(),

                Email = model.Email.Trim(),

                CoverImage = _staticService.GetRandomCoverImage(filePath),

                ImageUrl = Constants.DefaultProfileImagePath
            };

            // Register the user with the provided password
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // Assign the "User" role to the registered user
                if (!_roleManager.RoleExistsAsync(Helpers.ConstantHelpers.Role.User).Result)
                {
                    var role = new project.DAL.Entities.Role
                    {
                        Name = Helpers.ConstantHelpers.Role.User
                    };

                    await _roleManager.CreateAsync(role);
                }

                _userManager.AddToRoleAsync(user, Helpers.ConstantHelpers.Role.User).Wait();

                return new SingleResponse("Successful!");
            }
            else
            {
                return new SingleResponse("Something wrong!");
            }
        }

        /// <summary>
        /// Handles the login process for a user.
        /// </summary>
        /// <param name="model">The LoginViewModel containing the user's login credentials.</param>
        /// <returns>The appropriate ActionResult based on the login result.</returns>
        [HttpPost(Routes.Login)]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Username.Trim(), model.Password.Trim(), true, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    var user = await _userService.GetUserByUsernameAsync(model.Username);

                    var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                    var authKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]));

                    var token = new JwtSecurityToken(
                        issuer: _configuration["JWT:ValidIssuer"],
                        audience: _configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddDays(3),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authKey, SecurityAlgorithms.HmacSha256Signature));

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
            }

            return Unauthorized();
        }
    }
}
