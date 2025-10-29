using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobManagementAPI.Dtos
{
    public class CreateJobDto
    {
        [Required, MaxLength(200)]
        public string JobTitle { get; set; }

        [Required, MaxLength(200)]
        public string CompanyName { get; set; }

        [Required, MaxLength(150)]
        public string Location { get; set; }

        [Required, RegularExpression("Full-time|Part-time|Contract|Internship", ErrorMessage = "JobType must be one of: Full-time, Part-time, Contract, Internship")]
        public string JobType { get; set; }

        // New numeric fields
        [Range(0, double.MaxValue)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal MinSalary { get; set; }

        [Range(0, double.MaxValue)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal MaxSalary { get; set; }

        public string JobDescription { get; set; }
        public string Requirements { get; set; }
        public string Responsibilities { get; set; }

        [DataType(DataType.Date)]
        public DateTime? ApplicationDeadline { get; set; }
    }
}
