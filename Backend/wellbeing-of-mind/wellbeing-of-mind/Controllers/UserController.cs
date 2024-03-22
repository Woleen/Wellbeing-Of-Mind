using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using wellbeing_of_mind.Domain;
using wellbeing_of_mind.Infastructure;
using wellbeing_of_mind.DTOs;

namespace wellbeing_of_mind.Controllers
{
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly UsersDbContext _dbContext;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, UsersDbContext dbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _dbContext = dbContext;
        }

        [HttpPost("/api/register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            User user = new() { UserName = model.Username, Email = model.Email };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await AssignRole(user.Id, "User");
                return Ok("User registered successfully!");
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("/api/login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return Unauthorized("Invalid email or password");
            }

            var roles = await _userManager.GetRolesAsync(user);

            var token = GenerateJwtToken(user, roles);

            return Ok(new { token });
        }

        private static string GenerateJwtToken(User user, IEnumerable<string> roles)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Environment.GetEnvironmentVariable("JWT_KEY");

                if (string.IsNullOrEmpty(key))
                {
                    throw new InvalidOperationException("JWT key is empty.");
                }

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, string.Join(",", roles))
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error generating JWT token: " + ex.Message);
                return null;
            }
        }

        [HttpPost("/api/addtofavorites")]
        public async Task<IActionResult> AddFavoriteArticle([FromBody] AddToFavoritesViewModel model)
        {
            try
            {
                var currentUser = await _userManager.FindByIdAsync(model.UserId);
                if (currentUser == null)
                {
                    return Unauthorized("User not found");
                }

                var existingFavorite = await _dbContext.SQLArticles
                    .FirstOrDefaultAsync(a => a.UserId == currentUser.Id && a.ArticleId == model.ArticleId);

                if (existingFavorite != null)
                {
                    _dbContext.SQLArticles.Remove(existingFavorite);
                    await _dbContext.SaveChangesAsync();

                    return Ok("Article removed from favorites");
                }

                SQLArticle sqlArticle = new SQLArticle
                {
                    ArticleId = model.ArticleId,
                    Title = model.Title,
                    UserId = currentUser.Id
                };

                _dbContext.SQLArticles.Add(sqlArticle);
                await _dbContext.SaveChangesAsync();

                return Ok("Article added to favorites successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }





        [HttpGet("/api/{userId}/favorites")]
        public IActionResult GetFavoriteArticles(string userId)
        {
            try
            {
                var favoriteArticles = _dbContext.SQLArticles
                    .Where(a => a.UserId == userId)
                    .Select(a => new
                    {
                        Title = a.Title,
                        ArticleId = a.ArticleId,
                    })
                    .ToList();

                return Ok(favoriteArticles);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching favorite articles: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        public async Task<IActionResult> AssignRole(string userId, string roleName)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                return NotFound("Role not found");
            }

            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (result.Succeeded)
            {
                return Ok("Role assigned successfully");
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }
    }
}
