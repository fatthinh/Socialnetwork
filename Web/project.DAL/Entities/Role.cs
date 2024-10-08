﻿using Microsoft.AspNetCore.Identity;
using project.common.Core.Abstraction;

namespace project.DAL.Entities
{
    /// <summary>
    /// Represents a Role entity that inherits from IdentityRole and implements the IEntity interface.
    /// </summary>
    public class Role : IdentityRole, IEntity
    {
        // No additional properties or methods are defined in this class.
        // It inherits all the properties and methods from IdentityRole.
    }
}
