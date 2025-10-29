namespace JobManagementAPI.Dtos
{
    public class JobFilterDto
    {
        public string? Title { get; set; }
        public string? Location { get; set; }
        public string? JobType { get; set; }
        // SalaryMin and SalaryMax are optional and depend on how you store SalaryRange.
        // If SalaryRange is a single string like "50k-80k" parsing is required. For simplicity we filter by substring match.
        // New numeric filters for range slider
        public decimal? SalaryMin { get; set; }
        public decimal? SalaryMax { get; set; }
    }
}
