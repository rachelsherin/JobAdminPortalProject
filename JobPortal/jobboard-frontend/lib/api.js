// lib/api.js
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';

/**
 * Fetch jobs from backend with optional filters.
 * Backend expects query names: title, location, jobType, salaryMin, salaryMax
 * Returns an array of Job objects (matching your Job model).
 */
export async function fetchJobs(filters = {}) {
  const params = {};

  if (filters.title) params.title = filters.title;
  if (filters.location) params.location = filters.location;
  if (filters.jobType) params.jobType = filters.jobType;
  if (typeof filters.salaryMin === 'number') params.salaryMin = filters.salaryMin;
  if (typeof filters.salaryMax === 'number') params.salaryMax = filters.salaryMax;

  const url = `${API_BASE}/api/jobs`;
  const res = await axios.get(url, { params });
  return res.data;
}

/**
 * Create a new job.
 * Payload must match CreateJobDto:
 * {
 *   JobTitle, CompanyName, Location, JobType,
 *   MinSalary, MaxSalary, JobDescription, Requirements,
 *   Responsibilities, ApplicationDeadline (ISO string or null)
 * }
 */
export async function createJob(payload) {
  const url = `${API_BASE}/api/jobs`;
  const res = await axios.post(url, payload);
  return res.data;
}
