using JobManagementAPI.Dtos;
using JobManagementAPI.Models;

namespace JobManagementAPI.Interfaces.Services
{
    public interface IJobService
    {
        Task<IEnumerable<Job>> GetJobsAsync(JobFilterDto filter);
        Task<Job> CreateJobAsync(CreateJobDto dto);
        Task<Job?> GetJobByIdAsync(int id);
    }
}
