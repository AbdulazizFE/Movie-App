using System.ComponentModel.DataAnnotations;

namespace NewJWT
{
    public class UserRegister
    {
       [Required (ErrorMessage = "Fulll Name is required")]
        public string FullName { get; set; } = String.Empty;

        [Required(ErrorMessage = "User Name is required")]
        public string UserName { get; set; } = String.Empty;

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public String Email { get; set; } = String.Empty;

        [Required(ErrorMessage = "Password is Required")]
        [RegularExpression("^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,}$",
            ErrorMessage = "Passwords must be minimum 8 characters and can contain upper case, lower case, number (0-9) and special character")]
        public string Password { get; set; }
   

    }
}

