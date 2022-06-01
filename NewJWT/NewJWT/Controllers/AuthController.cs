using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NewJWT.Data;
using NewJWT.Users;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace NewJWT.Properties
{
    [Route("api/[controller]")]

    [ApiController]
    public class AuthController : ControllerBase
    {
        // Instance new User
        public static User user = new User();
        private readonly IConfiguration _configuration;
        private readonly datacontext _context;

        public AuthController(IConfiguration configuration, datacontext context)
        {
            _configuration = configuration;
            _context = context;
        }
        // Register new User
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserRegister request)
        {

            user.FullName = null;
            user.UserName = null;
            user.PasswordHash = null;
            user.PasswordSalt = null;
            user.Email = null;
            user.Id = 0;

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            List<string> UsreEmails = await _context.User.Select(x => x.Email).ToListAsync();
            if ((UsreEmails.Contains(request.Email)))
            {

                return BadRequest("The Email is already register!");
            }
            else
        
            //Add New Values for new user
            user.FullName = request.FullName;
            user.UserName = request.UserName;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Email = request.Email;
            _context.User.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }


        // login User
        [AllowAnonymous]
        [HttpPost("login")]

        public async Task<ActionResult<Response>> Login([FromBody] UserLogin request)
        {
            // Validate Users Email
        var user = await _context.User.FirstOrDefaultAsync(u => u.Email == request.Email);

            if( user == null)
            {
                return BadRequest("User not found!");
            }

        
            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {

                return BadRequest("please check again your email or Password!");
            }
            else
            {

                string token = CreateToken(request);
                Response response = new Response();
                response.Message = "Hello User!";
                response.token = token;
                return Ok(response);
            }

        }

        [HttpPost("logut")]

        public async Task<ActionResult<Response>> Logut([FromBody] string  userEmail)
        {
                Response response = new Response();
                response.Message = "You are log out!";
                response.token = null;
                return Ok(response);
        }

        private string CreateToken(UserLogin user)
            {
            // Claim: Authanticate user
            List<Claim> claims = new List<Claim>
            {
                // define which properity to be check
                new Claim(ClaimTypes.Name, user.Email)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            // Create token
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(7),// Days For token's valid
                signingCredentials: creds);
            
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
                
            return jwt;
        }
       
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

    }
}
