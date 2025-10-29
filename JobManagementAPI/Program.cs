using JobManagementAPI.Data;
using JobManagementAPI.Interfaces.Repositories;
using JobManagementAPI.Interfaces.Services;
using JobManagementAPI.Middlewares;
using JobManagementAPI.Repositories;
using JobManagementAPI.Repositories.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositories & Services
builder.Services.AddScoped<IJobRepository, JobRepository>();
builder.Services.AddScoped<IJobService, JobService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // your React app
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Global exception middleware (must be before other handlers)
app.UseGlobalExceptionHandler();

app.UseHttpsRedirection();
// ? Apply CORS policy here
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();
