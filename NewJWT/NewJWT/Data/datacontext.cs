using Microsoft.EntityFrameworkCore;
using NewJWT.Models;

namespace NewJWT.Data
{
    public class datacontext :DbContext
    {
        public datacontext(DbContextOptions<datacontext> options) : base(options)
        {

        }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<User> User { get; set; }

    }
}
