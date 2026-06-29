using System;

namespace backend.Core.Entities
{
    public class UserSession
    {
        public Guid SessionId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public DateTime IssuedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
        public bool IsRevoked { get; set; } = false;
        public DateTime? LastActivity { get; set; }
    }
}