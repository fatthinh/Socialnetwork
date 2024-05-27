using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using project.BLL.Abstract;
using project.BLL.Concrete;
using project.common.Core.Concrete.EntityFramework;
using project.DAL.Abstract;
using project.DAL.Concrete.EFEntityFramework;
using project.DAL.Entities;
using project.Web.Abstract;
using project.Web.Concrete;
using project.Web.Helpers.ConstantHelpers;
using project.Web.Hubs;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Register the database context
var connectionString = builder.Configuration.GetConnectionString(Constants.ConnectionStringName);

builder.Services.AddDbContext<SocialNetworkDbContext>(options =>
{
    options.UseSqlServer(connectionString, sqlServerOptions =>
    {
        // Specify the assembly where the EF Core migrations are located
        sqlServerOptions.MigrationsAssembly(Constants.MigrationsAssembly);

        // Enable transient error resiliency (retry on failure)
        sqlServerOptions.EnableRetryOnFailure();
    });
});

// Dependency injection configuration
builder.Services.AddScoped<IUserDal, EFUserDal>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IFriendRequestDal, EFFriendRequestDal>();
builder.Services.AddScoped<IFriendRequestService, FriendRequestService>();
builder.Services.AddScoped<INotificationDal, EFNotificationDal>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IFriendshipDal, EFFriendshipDal>();
builder.Services.AddScoped<IFriendshipService, FriendshipService>();
builder.Services.AddScoped<IMediaService, MediaService>();
builder.Services.AddScoped<IPostDal, EFPostDal>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<IStaticService, StaticService>();
builder.Services.AddScoped<ILikeDal, EFLikeDal>();
builder.Services.AddScoped<ILikeService, LikeService>();
builder.Services.AddScoped<ICommentDal, EFCommentDal>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<IChatDal, EFChatDal>();
builder.Services.AddScoped<IChatService, ChatService>();
builder.Services.AddScoped<IMessageDal, EFMessageDal>();
builder.Services.AddScoped<IMessageService, MessageService>();


// Register Session
builder.Services.AddSession();

// Register Identity
builder.Services.AddIdentity<User, project.DAL.Entities.Role>()
                .AddEntityFrameworkStores<SocialNetworkDbContext>()
                .AddSignInManager<SignInManager<User>>()
                .AddDefaultTokenProviders();

// Register AutoMapper 
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllersWithViews();

// Register SignalR
builder.Services.AddSignalR();

// Configure the expiration time span for the authentication cookie
builder.Services.Configure<CookieAuthenticationOptions>(options =>
{
    options.ExpireTimeSpan = TimeSpan.FromDays(Constants.CookieExpireTimeSpan);
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer= builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:SecretKey"]))
    };
});

//Add CORS policy to allow requests from localhost:7009
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("*")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Configure the FormOptions to increase value and file size limits
builder.Services.Configure<FormOptions>(o => {
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// Use Session
app.UseSession();

// Other middleware
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Use the CORS policy
app.UseCors();

// Configure routes
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(name: "Default", pattern: "{controller=Home}/{action=Index}");
    endpoints.MapHub<UserHub>("/userhub");
});

// Uncomment the following line if you want to redirect the root URL to a specific route
app.UseRewriter(new RewriteOptions().AddRedirect("^$", "/"));

app.Run();