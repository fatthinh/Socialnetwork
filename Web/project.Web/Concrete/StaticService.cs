﻿

using project.BLL.Abstract;
using project.common.Extensions;
using project.DAL.Entities;
using project.Web.Abstract;
using project.Web.Entities;
using project.Web.Helpers.ConstantHelpers;
using project.Web.Helpers.Utilities;

namespace project.Web.Concrete
{
    /// <summary>
    /// Concrete implementation of the IStaticService interface for managing static content.
    /// </summary>
    public class StaticService : IStaticService
    {
        /// <summary>
        /// Private field holding an instance of the <see cref="IUserService"/> interface.
        /// It provides access to user-related operations and functionalities.
        /// </summary>
        private readonly IUserService _userService;

        /// <summary>
        /// Initializes a new instance of the StaticService class.
        /// </summary>
        /// <param name="userService">The user service used for user-related operations.</param>
        public StaticService(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Get a list of advertisements randomly shuffled and limited to a specific count from the given file path.
        /// </summary>
        /// <param name="path">The file path containing the advertisement data.</param>
        /// <returns>A list of Advertisement objects.</returns>
        public List<Advertisement?> GetAdvertisements(string path)
        {
            var advertisements = FileHelper<Advertisement>.Deserialize(path);

            advertisements.Shuffle();

            return advertisements.Take(Constants.AdvertisementCountInNewsFeed).ToList();
        }

        /// <summary>
        /// Get a random cover image URL from the given file path.
        /// </summary>
        /// <param name="path">The file path containing the image URLs.</param>
        /// <returns>A randomly selected image URL.</returns>
        public string GetRandomCoverImage(string path)
        {
            var imageUrls = FileHelper<string>.ReadTextFile(path);

            var rand = new Random().Next(0, imageUrls.Count);

            return imageUrls.ElementAt(rand);
        }

        /// <summary>
        /// Get a list of random status image URLs from the given file path.
        /// </summary>
        /// <param name="count">The number of random image URLs to return.</param>
        /// <param name="path">The file path containing the image URLs.</param>
        /// <returns>A list of random image URLs.</returns>
        public List<string> GetRandomStatusImagePaths(int count, string path)
        {
            var imageUrls = FileHelper<string>.ReadTextFile(path);

            var rand = new Random();

            var randomImages = new List<string>();

            count = Math.Min(count, imageUrls.Count);

            while (randomImages.Count < count)
            {
                var randomIndex = rand.Next(0, imageUrls.Count);

                var randomImage = imageUrls[randomIndex];

                if (!randomImages.Contains(randomImage))
                {
                    randomImages.Add(randomImage);
                }
            }

            return randomImages;
        }

        /// <summary>
        /// Get a list of special users asynchronously from the file containing their IDs.
        /// </summary>
        /// <returns>A list of User objects representing special users.</returns>
        public async Task<List<User>> GetSpecialUsersAsync()
        {
            string filepath = Path.Combine(FileConstants.FilesFolderPath, FileConstants.SpecialUsersFile);

            var ids = FileHelper<string>.ReadTextFile(filepath);

            var specialUsers = new List<User>();

            foreach ( var id in ids)
            {
                var specialUser = await _userService.GetUserByIdAsync(id);

                specialUsers.Add(specialUser);
            }

            return specialUsers;
        }

        /// <summary>
        /// Get a list of watch videos randomly shuffled and limited to a specific count from the given file path.
        /// </summary>
        /// <param name="path">The file path containing the video data.</param>
        /// <returns>A list of Video objects.</returns>
        public List<Video?> GetWatchVideos(string path)
        {
            var videos = FileHelper<Video>.Deserialize(path).Take(Constants.VideoCountInNewsFeed).ToList();

            videos.Shuffle();

            return videos;
        }
    }
}
