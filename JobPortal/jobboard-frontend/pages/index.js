// pages/index.js
import React, { useEffect, useState, useCallback } from 'react';
import { Container, Grid, Loader, Title, Space } from '@mantine/core';
 import Navbar from '../components/Navbar';
 import FiltersBar from '../components/FiltersBar';
 import JobCard from '../components/JobCard';
 import CreateJobModal from '../components/CreateJobModal';
 import { fetchJobs } from '../lib/api';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createOpened, setCreateOpened] = useState(false);

  // Filters (parent holds state). Parent will debounce requests before calling API
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salaryMin: 0,
    salaryMax: 1200000,
  });

  // Debounce fetching: when filters change, wait 350ms before calling backend
  useEffect(() => {
    const t = setTimeout(() => {
      loadJobs();
    }, 350);
    return () => clearTimeout(t);
  }, [filters]);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      // map filter keys to API params expected by backend
      const apiFilters = {
        title: filters.title || undefined,
        location: filters.location || undefined,
        jobType: filters.jobType || undefined,
        salaryMin: typeof filters.salaryMin === 'number' ? filters.salaryMin : undefined,
        salaryMax: typeof filters.salaryMax === 'number' ? filters.salaryMax : undefined,
      };

      const data = await fetchJobs(apiFilters);
      // backend returns IEnumerable<Job>
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load jobs', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    // initial load
    loadJobs();
  }, []); // eslint-disable-line

  function handleResetFilters() {
    setFilters({
      title: '',
      location: '',
      jobType: '',
      salaryMin: 0,
      salaryMax: 1200000,
    });
  }

  function handleCreated(newJob) {
    // ensure fields align: push newJob at top
    setJobs((prev) => [newJob, ...prev]);
  }

  return (
    <>
      <Navbar onOpenCreate={() => setCreateOpened(true)} />
      <Container mt="md">
        <Title order={2} mb="sm">Job Listings</Title>

        <FiltersBar filters={filters} onChange={setFilters} onReset={handleResetFilters} />

        {loading ? (
  <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
    <Loader size="lg" />
  </div>
) : (
  <>
    {jobs.length === 0 ? (
      <div style={{ padding: 40 }}>No jobs found</div>
    ) : (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          padding: '20px 0',
        }}
      >
        {jobs.map((job) => (
          <JobCard
            key={job.id ?? job.Id}
            job={{
              id: job.id ?? job.Id,
              jobTitle: job.JobTitle ?? job.jobTitle,
              companyName: job.CompanyName ?? job.companyName,
              location: job.Location ?? job.location,
              jobType: job.JobType ?? job.jobType,
              minSalary: job.MinSalary ?? job.minSalary,
              maxSalary: job.MaxSalary ?? job.maxSalary,
              jobDescription: job.JobDescription ?? job.jobDescription,
              createdAt: job.CreatedAt ?? job.createdAt,
            }}
          />
        ))}
      </div>
    )}
    <Space h="xl" />
  </>
)}

      </Container>

      <CreateJobModal
        opened={createOpened}
        onClose={() => setCreateOpened(false)}
        onCreated={handleCreated}
      />
    </>
  );
}
