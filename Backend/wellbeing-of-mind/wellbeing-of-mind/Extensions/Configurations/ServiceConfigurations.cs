using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Text;
using wellbeing_of_mind.Infastructure;
using wellbeing_of_mind.Domain;

namespace wellbeing_of_mind.Extensions.Configurations
{
    public static class ServiceConfigurations
    {

        public static void ConfigureAllServices(this IServiceCollection services, WebApplicationBuilder builder)
        {
            // Configure CORS
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });

            // Configure MongoDB
            services.AddSingleton<IMongoClient>(_ =>
            {
                string connectionString = Environment.GetEnvironmentVariable("MongoDB");
                var settings = MongoClientSettings.FromConnectionString(connectionString);
                settings.ServerApi = new ServerApi(ServerApiVersion.V1);
                return new MongoClient(settings);
            });

            services.AddScoped<IMongoDatabase>(_ =>
            {
                var client = _.GetService<IMongoClient>();

                if (client == null)
                {
                    Console.WriteLine("MongoClient is null");
                    throw new Exception("Null");
                }

                return client.GetDatabase("articles");
            });

            // Configure AutoMapper
            services.AddAutoMapper(typeof(Program));

            // Configure in-memory cache
            services.AddMemoryCache();

            services.AddControllers(configure =>
                configure.CacheProfiles.Add("Any-60",
                    new CacheProfile
                    {
                        Location = ResponseCacheLocation.Any,
                        Duration = 60
                    }));

            // Configure JWT authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    string jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                    };
                });

            // Configure Entity Framework Core for SQL Server
            builder.Services.AddDbContext<UsersDbContext>(options =>
                options.UseSqlServer(Environment.GetEnvironmentVariable("USERS_DB")));


            // Configure Identity
            services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredLength = 8;

                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
                options.Lockout.MaxFailedAccessAttempts = 5;

                options.User.RequireUniqueEmail = true;

                options.SignIn.RequireConfirmedAccount = false;
            })
            .AddEntityFrameworkStores<UsersDbContext>()
            .AddDefaultTokenProviders();

            // Configure Swagger
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
        }
    }
}
