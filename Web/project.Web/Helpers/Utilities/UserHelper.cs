﻿using Microsoft.AspNetCore.Identity;
using project.BLL.Abstract;
using project.DAL.Entities;
using System.Security.Claims;

namespace project.Web.Helpers.Utilities
{
    /// <summary>
    /// Helper class for retrieving the current authenticated user.
    /// </summary>
    public class UserHelper
    {

        /// <summary>
        /// Retrieves the current authenticated user from the HttpContext.
        /// </summary>
        /// <param name="httpContext">The HttpContext representing the current HTTP request.</param>
        /// <returns>The current authenticated user, or null if not authenticated.</returns>
        public static async Task<string?> GetCurrentUserAsync(IHttpContextAccessor _httpContextAccessor)
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            return userId;    
        }
    }
}