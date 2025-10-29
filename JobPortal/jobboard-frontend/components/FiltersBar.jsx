import React from 'react';
import {
  Group,
  TextInput,
  Select,
  RangeSlider,
  Button,
  Text,
  Divider,
} from '@mantine/core';
import {
  IconSearch,
  IconMapPin,
  IconBriefcase,
  IconBriefcase as IconJobType, // Renaming IconBriefcase to use a more specific name
} from '@tabler/icons-react';

export default function FiltersBar({ filters, onChange, onReset }) {
  const update = (partial) => onChange({ ...filters, ...partial });

  // Helper to format salary for display
  const formatSalary = (value) => {
    // Assuming value is in ₹ and you want a 'k' abbreviation
    return new Intl.NumberFormat('en-IN', {
      notation: 'compact',
      compactDisplay: 'short',
      style: 'currency',
      currency: 'INR',
      maximumSignificantDigits: 3,
    })
      .format(value)
      .replace('₹', '')
      .trim(); // Remove the rupee sign for simplicity
  };

  const currentMin = filters.salaryMin ?? 0;
  const currentMax = filters.salaryMax ?? 2000000;

  return (
    // REMOVED 'padding: 12px 24px' on the outer div to simplify width calculation.
    // The filter elements will now control their spacing and sizing.
    <div
      style={{
        width: '100%',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        // Increased overall padding to ensure components aren't touching the edge
        padding: '16px 40px', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Changed to space-between for better full width distribution
        gap: '24px', // Increased gap for visual separation
        boxSizing: 'border-box',
        flexWrap: 'nowrap',
      }}
    >
      {/* 🔍 Job Title */}
      <TextInput
        leftSection={<IconSearch size={18} />}
        placeholder="Search by Job Title, Role"
        value={filters.title || ''}
        onChange={(e) => update({ title: e.target.value })}
        // Increased flex-basis to give it more space
        style={{ flex: '1 1 250px' }} 
        radius="lg" // Added radius for a softer look
        variant="filled" // To match the style in the screenshot
      />

      {/* 📍 Location */}
      {/* Changed to TextInput as the placeholder in the design shows an input field */}
      <TextInput 
        leftSection={<IconMapPin size={18} />}
        placeholder="Preferred Location"
        value={filters.location || ''}
        onChange={(e) => update({ location: e.target.value })}
        // Increased flex-basis
        style={{ flex: '1 1 200px' }} 
        radius="lg"
        variant="filled"
      />

      {/* 💼 Job Type - Changed to use IconJobType (which is a renamed IconBriefcase) 
          and made it a simple Select like the design suggests. */}
      <Select
        // ✅ CHANGE: The icon in the design is a person or a job icon, 
        // using IconBriefcase (renamed to IconJobType) as it's often used for job type.
        // You might need to change this if you have a specific custom icon for 'Job type'
        leftSection={<IconBriefcase size={18} />} 
        placeholder="Job type"
        data={[
          { value: '', label: 'All' },
          { value: 'Full-time', label: 'Full-time' },
          { value: 'Part-time', label: 'Part-time' },
          { value: 'Contract', label: 'Contract' },
          { value: 'Internship', label: 'Internship' },
        ]}
        value={filters.jobType || ''}
        onChange={(val) => update({ jobType: val })}
        style={{ flex: '1 1 180px' }}
        radius="lg"
        variant="filled"
      />

      <Divider orientation="vertical" />

      {/* 💰 Salary Range */}
      <div
        style={{
          flex: '0 0 250px', // Fixed size for the slider
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Group justify="space-between" align="center" style={{ width: '100%', marginBottom: 4 }}>
          <Text size="sm" fw={500} style={{ color: '#333' }}>
            Salary Per Month
          </Text>
          <Text size="sm" fw={700} style={{ color: '#000' }}>
            {/* Displaying the current range values */}
            {formatSalary(currentMin)} - {formatSalary(currentMax)}
          </Text>
        </Group>
        <RangeSlider
          min={0}
          max={2000000} // Set a realistic max salary (e.g., 20 Lakhs)
          step={10000}
          value={[currentMin, currentMax]}
          onChange={(val) =>
            update({ salaryMin: val[0], salaryMax: val[1] })
          }
          color="dark" // Using 'dark' or another color to match the black dots in the design
          styles={{
            root: { padding: '0 8px' }, // Add some horizontal padding to the slider track
            thumb: { borderColor: '#000', borderWidth: 2, background: '#fff' }, // White thumb with black border
            track: { height: 4, background: '#ccc' },
            bar: { backgroundColor: '#000' }, // Black bar for the selected range
          }}
        />
      </div>

      {/* The Reset button from your original code is not in the screenshot's filter bar, 
          so I've commented it out to match the design. */}
      {/* <Button variant="outline" onClick={onReset} style={{ flex: '0 0 100px' }}>
        Reset
      </Button> 
      */}
    </div>
  );
}




