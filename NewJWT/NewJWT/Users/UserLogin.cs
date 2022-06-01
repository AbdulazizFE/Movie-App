using System.ComponentModel.DataAnnotations;

namespace NewJWT
{
    public class UserLogin
    {
        [Required( ErrorMessage = "Email is required")]
   
        public String Email { get; set; } = String.Empty;
        
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = String.Empty;
    }
}
