using Api_GeneratorAngularApp.Data;
using Api_GeneratorAngularApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Api_GeneratorAngularApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        public IConfiguration _configuration;
        private GeneratorContext dbContext;
        public TokenController(IConfiguration config, GeneratorContext generatorContext)
        {
            this._configuration = config;
            this.dbContext = generatorContext;
        }

        [HttpGet]
        public IEnumerable<GeneratorInfo> Get()
        {
          return  this.dbContext.Generators.ToList();
           
        }

        [HttpPost]
        public IActionResult Post([FromBody] UserInfo _userData)
        {
                LoginResponse loginResponse = new LoginResponse();

                var user = GetUser(_userData.username, Base64Encode(_userData.password));

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.Username),
                        new Claim("Role", user.Role),
                        new Claim("UserName", user.Username),
                        new Claim("Email", user.Username)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    loginResponse.username = user.Username;
                    loginResponse.status = new JwtSecurityTokenHandler().WriteToken(token);
                    return Ok(loginResponse);
                }
                else
                {
                    loginResponse.username = user.Username;
                    loginResponse.status = "Invalid credentials";
                    return BadRequest(loginResponse);
                }
           
        }

        private User GetUser(string email, string password)
        {
            return dbContext.Users.FirstOrDefault(u => u.Email == email && u.Password == password);
        }

        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

    }
}
