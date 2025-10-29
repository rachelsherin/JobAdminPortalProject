using JobManagementAPI.Dtos;
using JobManagementAPI.Interfaces.Repositories;
using JobManagementAPI.Interfaces.Services;
using JobManagementAPI.Models;

namespace JobManagementAPI.Repositories.Services
{
    public class JobService : IJobService
    {
        private readonly IJobRepository _repo;
        private readonly ILogger<JobService> _logger;

        public JobService(IJobRepository repo, ILogger<JobService> logger)
        {
            _repo = repo;
            _logger = logger;
        }

        public async Task<Job> CreateJobAsync(CreateJobDto dto)
        {
            // Map DTO -> Entity (now with MinSalary/MaxSalary)
            var job = new Job
            {
                JobTitle = dto.JobTitle,
                CompanyName = dto.CompanyName,
                Location = dto.Location,
                JobType = dto.JobType,
                MinSalary = dto.MinSalary,
                MaxSalary = dto.MaxSalary,
                JobDescription = dto.JobDescription ?? string.Empty,
                Requirements = dto.Requirements ?? string.Empty,
                Responsibilities = dto.Responsibilities ?? string.Empty,
                ApplicationDeadline = dto.ApplicationDeadline
            };

            await _repo.AddAsync(job);
            await _repo.SaveChangesAsync();

            _logger.LogInformation("Created Job {JobTitle} for company {Company}", job.JobTitle, job.CompanyName);

            return job;
        }

        public async Task<Job?> GetJobByIdAsync(int id)
        {
            return await _repo.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Job>> GetJobsAsync(JobFilterDto filter)
        {
            // pass numeric salary filters to repository
            return await _repo.GetFilteredAsync(filter.Title, filter.Location, filter.JobType, filter.SalaryMin, filter.SalaryMax);
        }
    }
}
