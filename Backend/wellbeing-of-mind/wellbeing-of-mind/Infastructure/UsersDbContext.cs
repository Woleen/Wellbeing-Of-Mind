using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using wellbeing_of_mind.Domain;

namespace wellbeing_of_mind.Infastructure
{
    public class UsersDbContext : IdentityDbContext<User>
    {
        public UsersDbContext(DbContextOptions<UsersDbContext> options) : base(options)
        {
        }

        public DbSet<SQLArticle> SQLArticles { get; set; }

        public DbSet<IdentityUserRole<string>> UserRoles { get; set; }
    }
}