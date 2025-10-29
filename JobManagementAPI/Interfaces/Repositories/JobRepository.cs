using JobManagementAPI.Data;
using JobManagementAPI.Interfaces.Repositories;
using JobManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JobManagementAPI.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly ApplicationDbContext _db;

        public JobRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<Job> AddAsync(Job job)
        {
            await _db.Jobs.AddAsync(job);
            return job;
        }

        public async Task<IEnumerable<Job>> GetAllAsync()
        {
            return await _db.Jobs.OrderByDescending(j => j.CreatedAt).ToListAsync();
        }

        public async Task<Job?> GetByIdAsync(int id)
        {
            return await _db.Jobs.FindAsync(id);
        }

        // Updated: numeric salary filter logic
        public async Task<IEnumerable<Job>> GetFilteredAsync(string? title, string? location, string? jobType, decimal? salaryMin, decimal? salaryMax)
        {
            var query = _db.Jobs.AsQueryable();

            if (!string.IsNullOrWhiteSpace(title))
            {
                var normalizedTitle = title.Trim().ToLower();
                query = query.Where(j => j.JobTitle.ToLower().Contains(normalizedTitle));
            }

            if (!string.IsNullOrWhiteSpace(location))
            {
                var normalizedLocation = location.Trim().ToLower();
                query = query.Where(j => j.Location.ToLower().Contains(normalizedLocation));
            }

            if (!string.IsNullOrWhiteSpace(jobType))
                query = query.Where(j => j.JobType == jobType);

            
            if (salaryMin.HasValue)
                query = query.Where(j => j.MinSalary >= salaryMin.Value);

            if (salaryMax.HasValue)
                query = query.Where(j => j.MaxSalary <= salaryMax.Value);

            return await query.OrderByDescending(j => j.CreatedAt).ToListAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}
