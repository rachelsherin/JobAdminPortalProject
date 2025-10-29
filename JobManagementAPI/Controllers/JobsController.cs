using JobManagementAPI.Dtos;
using JobManagementAPI.Interfaces.Services;
using JobManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace JobManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly IJobService _jobService;
        private readonly ILogger<JobsController> _logger;

        public JobsController(IJobService jobService, ILogger<JobsController> logger)
        {
            _jobService = jobService;
            _logger = logger;
        }

        /// <summary>
        /// Get jobs with optional filters: title, location, jobType, salary
        /// Example: GET /api/jobs?title=Full&location=Chennai&jobType=Full-time
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> Get([FromQuery] JobFilterDto filter)
        {
            var jobs = await _jobService.GetJobsAsync(filter);
            return Ok(jobs);
        }

        /// <summary>
        /// Create a new job
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Job>> Create([FromBody] CreateJobDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _jobService.CreateJobAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Job>> GetById(int id)
        {
            var job = await _jobService.GetJobByIdAsync(id);
            if (job == null) return NotFound();
            return Ok(job);
        }
    }
}

