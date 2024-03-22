using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Text;
using wellbeing_of_mind.Infastructure;
using wellbeing_of_mind.Domain;


var builder = WebApplication.CreateBuilder(args);

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// MongoDB configuration
builder.Services.AddSingleton<IMongoClient>(_ =>
{
    string connectionString = Environment.GetEnvironmentVariable("MongoDB");
    var settings = MongoClientSettings.FromConnectionString(connectionString);
    settings.ServerApi = new ServerApi(ServerApiVersion.V1);
    return new MongoClient(settings);
});

builder.Services.AddScoped<IMongoDatabase>(_ =>
{
    var client = _.GetService<IMongoClient>();

    if (client == null)
    {
        Console.WriteLine("MongoClient is null");
        throw new Exception("Null");
    }

    return client.GetDatabase("articles");
});

// AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// Cache configuration
builder.Services.AddMemoryCache();

// Configure caching profiles
builder.Services.AddControllers(configure =>
    configure.CacheProfiles.Add("Any-60",
        new CacheProfile
        {
            Location = ResponseCacheLocation.Any,
            Duration = 60
        }));

// JWT authentication configuration
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdminRole", policy =>
        policy.RequireRole("Admin"));

    options.AddPolicy("RequireModeratorRole", policy =>
        policy.RequireRole("Moderator"));

    options.AddPolicy("RequireRole", policy =>
        policy.RequireRole("User", "Moderator", "Admin"));

});
// SQL Server

builder.Services.AddDbContext<UsersDbContext>((serviceProvider, options) =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlServer(connectionString);
});

builder.Services.AddIdentity<User, IdentityRole>(options =>
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
.AddDefaultTokenProviders()
.AddRoles<IdentityRole>();

async Task SeedRoles(RoleManager<IdentityRole> roleManager)
{
    var roles = new List<string> { "Admin", "Moderator", "User" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using var scope = app.Services.CreateScope();
var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

await SeedRoles(roleManager);


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler();
}


app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("AllowOrigin");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseResponseCaching();

app.Run();
