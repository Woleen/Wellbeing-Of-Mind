using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using wellbeing_of_mind.Domain;

namespace wellbeing_of_mind.Infastructure
{
    public class UsersDbContext : DbContext
    {
        public UsersDbContext(DbContextOptions<UsersDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<IdentityRole> Roles { get; set; }

    }
}