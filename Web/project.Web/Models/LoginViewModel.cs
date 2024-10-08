﻿using System.ComponentModel.DataAnnotations;

namespace project.Web.Models
{
    /// <summary>
    /// Represents the model for the login form.
    /// </summary>
    public class LoginViewModel
    {
        /// <summary>
        /// Gets or sets the username for the login.
        /// </summary>
        [Required]
        public string? Username { get; set; }

        /// <summary>
        /// Gets or sets the password for the login.
        /// </summary>
        [Required]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether to remember the user's login session.
        /// </summary>
        public bool RememberMe { get; set; }
    }
}
