using Microsoft.AspNetCore.Http;

namespace CoreApi.Models
{
    public class RegistrationModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FatherHusbandName { get; set; }
        public string Occupation { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public string StateUT { get; set; }
        public string District { get; set; }
        public string PIN { get; set; }
        public string PanNo { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string SecretQuestionId { get; set; }
        public string SecretAnswer { get; set; }

        // Extra fields added from frontend
        public string RegBy { get; set; }
        public string Password { get; set; }
        public string LoginStatus { get; set; }

        public IFormFile Photo { get; set; }
    }
}