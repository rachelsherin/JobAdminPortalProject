using System.ComponentModel.DataAnnotations;

namespace JobManagementAPI.Models
{
    public class Job
    {
        public int Id { get; set; }

        [Required, MaxLength(200)]
        public string JobTitle { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string CompanyName { get; set; } = string.Empty;

        [Required, MaxLength(150)]
        public string Location { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string JobType { get; set; } = string.Empty; // Full-time, Part-time, Contract, Internship

        // New numeric salary fields
        [Range(0, double.MaxValue)]
        public decimal MinSalary { get; set; }

        [Range(0, double.MaxValue)]
        public decimal MaxSalary { get; set; }

        public string JobDescription { get; set; } = string.Empty;
        public string Requirements { get; set; } = string.Empty;
        public string Responsibilities { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        public DateTime? ApplicationDeadline { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

