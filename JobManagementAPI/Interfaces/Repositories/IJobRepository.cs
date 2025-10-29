using JobManagementAPI.Models;

namespace JobManagementAPI.Interfaces.Repositories
{
    public interface IJobRepository
    {
        Task<IEnumerable<Job>> GetAllAsync();
        // Updated: accept numeric salary filters
        Task<IEnumerable<Job>> GetFilteredAsync(string? title, string? location, string? jobType, decimal? salaryMin, decimal? salaryMax);
        Task<Job?> GetByIdAsync(int id);
        Task<Job> AddAsync(Job job);
        Task SaveChangesAsync();
    }
}

