import React from 'react';
import { Card, Group, Text, Badge, Button, Image, Box } from '@mantine/core';
import { IconUser, IconMapPin, IconCoins } from '@tabler/icons-react';

function formatINR(value) {
  try {
    return value ? `₹${Number(value).toLocaleString('en-IN')}` : '₹0';
  } catch {
    return value;
  }
}

export default function JobCard({ job }) {
  const created = job.createdAt || job.CreatedAt;
  const createdDate = created ? new Date(created) : null;
  const diffDays = createdDate
    ? Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;
  const when =
    diffDays === 0 ? 'Today' : diffDays === 1 ? '1 day ago' : `${diffDays}d Ago`;

  // ✅ Choose logo based on job title (case-insensitive)
  const title = (job.jobTitle ?? job.JobTitle ?? '').toLowerCase().trim();

  let logoUrl =
    'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'; // default (Amazon)

  if (
    title.includes('ui') &&
    (title.includes('ux') || title.includes('designer'))
  ) {
    // Swiggy PNG logo (visible)
    logoUrl =
      'https://seeklogo.com/images/S/swiggy-logo-8EF8260FA4-seeklogo.com.png';
  } else if (title.includes('full stack')) {
    logoUrl =
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg';
  }

  return (
    <Card
      shadow="sm"
      radius="lg"
      p="lg"
      style={{
        width: 280,
        border: '1px solid #f0f0f0',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      }}
    >
      {/* Top section: logo inside rounded card + time */}
      <Group justify="space-between" align="center" mb="sm">
        <Box
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Image
            src={logoUrl}
            alt={job.companyName ?? job.CompanyName}
            width={28}
            height={28}
            fit="contain"
          />
        </Box>

        <Badge
          color="blue"
          variant="filled"
          style={{
            fontSize: 12,
            padding: '6px 10px',
            borderRadius: 8,
          }}
        >
          {when}
        </Badge>
      </Group>

      {/* Job title */}
      <Text fw={700} size="md" mt="xs" mb="xs">
        {job.jobTitle ?? job.JobTitle}
      </Text>

      {/* Experience / Location / Salary */}
      <Group spacing={12} mb="xs" align="center">
        <Group spacing={4} align="center">
          <IconUser size={16} color="#555" />
          <Text size="sm" c="dimmed">
            {job.experience ?? '1–3 yr Exp'}
          </Text>
        </Group>

        <Group spacing={4} align="center">
          <IconMapPin size={16} color="#555" />
          <Text size="sm" c="dimmed">
            {job.jobType ?? job.JobType ?? 'Onsite'}
          </Text>
        </Group>

        <Group spacing={4} align="center">
          <IconCoins size={16} color="#555" />
          <Text size="sm" c="dimmed">
            {formatINR(job.maxSalary ?? job.MaxSalary ?? 1200000).replace('₹', '')} LPA
          </Text>
        </Group>
      </Group>

      {/* Job description */}
      <ul style={{ margin: '6px 0 16px 18px', padding: 0 }}>
        <li style={{ fontSize: 13, color: '#555', lineHeight: 1.4 }}>
          A user-friendly interface lets you browse stunning photos and videos
        </li>
        <li style={{ fontSize: 13, color: '#555', lineHeight: 1.4 }}>
          Filter destinations based on interests and travel style
        </li>
        <li style={{ fontSize: 13, color: '#555', lineHeight: 1.4 }}>
          Create personalized recommendations
        </li>
      </ul>

      {/* Apply Now button */}
      <Button
        fullWidth
        radius="md"
        style={{
          backgroundColor: '#007BFF',
          color: '#fff',
          fontWeight: 600,
          padding: '10px 0',
          fontSize: 14,
        }}
      >
        Apply Now
      </Button>
    </Card>
  );
}

