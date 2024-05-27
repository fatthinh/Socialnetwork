using AutoMapper;
using project.DAL.Entities;
using project.Web.DTOs;
using project.Web.Entities;

namespace project.Web.Helpers.Mappers
{
    /// <summary>
    /// Class responsible for defining AutoMapper profiles.
    /// </summary>
    public class AutoMapperProfiles : Profile
    {
        /// <summary>
        /// Initializes a new instance of the AutoMapperProfiles class.
        /// </summary>
        public AutoMapperProfiles   ()
        {
            CreateMap<User, UserProfile>().ReverseMap();

            CreateMap<User, UserDTO>().ReverseMap();
        }
    }
}