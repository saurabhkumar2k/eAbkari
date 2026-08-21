using backend.Core.Entities.Department;
//using backend.Core.Interfaces;
using backend.Core.DTOs;
using System.Text.Json;
using backend.Core.Interfaces.Department;
using backend.Application.Interfaces.Department;
using System.Text;
using System.Security.Cryptography;

namespace backend.Application.Services.Department
{
    public class DepartmentUsersService : IDepartmentUsersService
    {
        private readonly IDepartmentUserRepository _departmentUsersRepository;
        private readonly IRoleService _roleService;


        public DepartmentUsersService(IDepartmentUserRepository departmentUsersRepository,IRoleService roleService)
        {
            _departmentUsersRepository = departmentUsersRepository;
            _roleService = roleService;
        }


        public async Task<IEnumerable<DepartmentUserDto>> GetAllAsync()
        {
            var users = await _departmentUsersRepository.GetAllAsync();

            if (users == null || !users.Any())
            {
                return Enumerable.Empty<DepartmentUserDto>();
            }

            return users.Select(x => new DepartmentUserDto
            {
                UserId = x.UserId,
                UserName = x.UserName,
                UserDesignation = x.UserDesignation,
                Email = x.Email,
                IsActive = x.IsActive,
                RoleId = x.DeptUserRoles.FirstOrDefault()?.RoleId ?? 0,
                BranchCode = x.DeptUserRoles.FirstOrDefault()?.BranchCode ?? 0
            });
        }

        public async Task<DepartmentUserDto?> GetByIdAsync(string userId)
        {
            var user = await _departmentUsersRepository.GetByIdAsync(userId);

            if (user == null)
            {
                return null;
            }

            return new DepartmentUserDto
            {
                UserId = user.UserId,
                UserName = user.UserName,
                UserDesignation = user.UserDesignation,
                Email = user.Email,
                IsActive = user.IsActive,
                RoleId = user.DeptUserRoles.FirstOrDefault()?.RoleId ?? 0,
                BranchCode = user.DeptUserRoles.FirstOrDefault()?.BranchCode ?? 0
            };
        }


        public async Task<bool> CreateAsync(DepartmentUserDto user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            if (string.IsNullOrWhiteSpace(user.UserId))
                throw new ArgumentException("UserId is required.");

            if (string.IsNullOrWhiteSpace(user.UserName))
                throw new ArgumentException("UserName is required.");

            if (string.IsNullOrWhiteSpace(user.Email))
                throw new ArgumentException("Email is required.");

            // Optional: Check if the user already exists
            var existingUser = await _departmentUsersRepository.GetByIdAsync(user.UserId);

            if (existingUser != null)
                throw new InvalidOperationException("User already exists.");

            // Get role through RoleService
            var role = await _roleService.GetByIdAsync(user.RoleId);

            if (role == null)
                throw new InvalidOperationException("Role not found or inactive.");

            var roleName = role.RoleName?.Trim();

            if (string.IsNullOrWhiteSpace(roleName))
                throw new InvalidOperationException("Role name is not available.");

            // var firstName = user.UserName
            //     .Trim()
            //     .Split(' ', StringSplitOptions.RemoveEmptyEntries)[0];

            // var usrId = $"{roleName}-{firstName}";

            var DepartmentUser = new DepartmentUsers
            {
                UserId = user.UserId.Trim(),
                UserName = user.UserName.Trim(),
                UserDesignation = user.UserDesignation.Trim(),
                Email = user.Email,
                MobileNo = user.MobileNo,
                IsActive = string.IsNullOrWhiteSpace(user.IsActive) ? "Y" : user.IsActive,
                CreatedDate = DateTime.Now
            };

            // 2. Default Password
            string defaultPassword = "Test@123";

            // 3. SHA256 Hash
            using (var sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(defaultPassword);
                byte[] hashBytes = sha256.ComputeHash(bytes);

                StringBuilder sb = new StringBuilder();
                foreach (byte b in hashBytes)
                {
                    sb.Append(b.ToString("X2"));
                }


                DepartmentUser.PasswordHash = sb.ToString();
            }
            var DeptUserRoleId = await _departmentUsersRepository.GetNextDeptUserRoleIdAsync();
            var DeptUserRoles = new DeptUserRoles
            {

                DeptUserRoleId = DeptUserRoleId,
                UserId = user.UserId.Trim(),
                RoleId = user.RoleId,
                BranchCode = user.BranchCode,
                IsActive = "Y"    
            };

            return await _departmentUsersRepository.CreateAsync(DepartmentUser, DeptUserRoles);
        }




        public async Task<bool> UpdateAsync(DepartmentUserDto user)
 {
     if (user == null)
         throw new ArgumentNullException(nameof(user));

     if (string.IsNullOrWhiteSpace(user.UserId))
         throw new ArgumentException("UserId is required.");

     if (string.IsNullOrWhiteSpace(user.UserName))
         throw new ArgumentException("UserName is required.");

     if (string.IsNullOrWhiteSpace(user.Email))
         throw new ArgumentException("Email is required.");

     var existingUser = await _departmentUsersRepository.GetByIdAsync(user.UserId);

     if (existingUser == null)
         throw new InvalidOperationException("User not exists.");

    // Validate role through RoleService
     var role = await _roleService.GetByIdAsync(user.RoleId);

     if (role == null)
         throw new InvalidOperationException("Role not found or inactive.");

     var DepartmentUser = new DepartmentUsers
     {
         UserId = user.UserId,
         UserName = user.UserName.Trim(),
         UserDesignation = user.UserDesignation.Trim(),
         Email = user.Email,
         MobileNo = user.MobileNo,
         IsActive = string.IsNullOrWhiteSpace(user.IsActive) ? "Y" : user.IsActive,
     };

     return await _departmentUsersRepository.UpdateAsync(DepartmentUser, user.RoleId, user.BranchCode);
 }

    }
}
