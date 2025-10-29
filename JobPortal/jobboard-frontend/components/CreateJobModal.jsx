import React from 'react';
import { Modal, Button, TextInput, Select, Textarea, Group, Box, Text } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { showNotification } from '@mantine/notifications';
import { createJob } from '../lib/api';

export default function CreateJobModal({ opened, onClose, onCreated }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isSubmitting, isSubmitted, touchedFields },
  } = useForm({
    defaultValues: {
      JobTitle: '',
      CompanyName: '',
      Location: '',
      JobType: 'Full-time',
      MinSalary: '',
      MaxSalary: '',
      JobDescription: '',
      Requirements: '',
      Responsibilities: '',
      ApplicationDeadline: '',
    },
  });

  // Helper: show errors only after submit or field touched
  const showFieldError = (name) => {
    return !!errors[name] && (isSubmitted || !!touchedFields[name]);
  };

  async function onSubmit(values) {
    const payload = {
      ...values,
      ApplicationDeadline: values.ApplicationDeadline
        ? new Date(values.ApplicationDeadline).toISOString()
        : null,
    };

    try {
      const created = await createJob(payload);
      showNotification({
        title: 'Job Created',
        message: 'Job published successfully',
        color: 'green',
      });
      reset();
      onCreated(created);
      onClose();
    } catch (err) {
      console.error(err);
      showNotification({
        title: 'Error',
        message: 'Failed to create job',
        color: 'red',
      });
    }
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Create Job Opening" size="lg" centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Job Title & Company Name */}
        <Group grow mb="sm">
          <Box>
            <TextInput
              label="Job Title"
              placeholder="Full Stack Developer"
              {...register('JobTitle', { required: 'Please enter the job title' })}
              error={showFieldError('JobTitle') ? errors.JobTitle?.message : undefined}
            />
          </Box>

          <Box>
            <TextInput
              label="Company Name"
              placeholder="Amazon, Microsoft, Swiggy"
              {...register('CompanyName', { required: 'Please enter the company name' })}
              error={showFieldError('CompanyName') ? errors.CompanyName?.message : undefined}
            />
          </Box>
        </Group>

        {/* Location & Job Type */}
        <Group grow mb="sm">
          <Box>
            <TextInput
              label="Location"
              placeholder="Choose Preferred Location"
              {...register('Location', { required: 'Please enter the location' })}
              error={showFieldError('Location') ? errors.Location?.message : undefined}
            />
          </Box>

          <Box>
            <Controller
              name="JobType"
              control={control}
              rules={{ required: 'Please select the job type' }}
              render={({ field }) => (
                <Select
                  label="Job Type"
                  data={['Full-time', 'Part-time', 'Contract', 'Internship']}
                  {...field}
                  error={showFieldError('JobType') ? errors.JobType?.message : undefined}
                />
              )}
            />
          </Box>
        </Group>

        {/* Salary Range + Application Deadline */}
        <Group grow mb="sm" align="flex-end">
          <Box style={{ flex: 2 }}>
            <label
              style={{
                fontSize: 14,
                fontWeight: 500,
                marginBottom: 6,
                display: 'block',
              }}
            >
              Salary Range
            </label>
            <Group grow>
              <Box>
                <Controller
                  name="MinSalary"
                  control={control}
                  rules={{
                    required: 'Please enter minimum salary',
                    validate: (val) => {
                      const min = val === '' ? NaN : Number(val);
                      if (Number.isNaN(min)) return 'Enter valid minimum salary';
                      const maxVal = getValues('MaxSalary');
                      if (maxVal !== '' && !Number.isNaN(Number(maxVal))) {
                        if (Number(maxVal) < min) return 'Min must be <= Max';
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <TextInput placeholder="₹0" type="number" {...field} />
                  )}
                />
                {showFieldError('MinSalary') && (
                  <Text size="xs" c="red">
                    {errors.MinSalary?.message}
                  </Text>
                )}
              </Box>

              <Box>
                <Controller
                  name="MaxSalary"
                  control={control}
                  rules={{
                    required: 'Please enter maximum salary',
                    validate: (val) => {
                      const max = val === '' ? NaN : Number(val);
                      if (Number.isNaN(max)) return 'Enter valid maximum salary';
                      const minVal = getValues('MinSalary');
                      if (minVal !== '' && !Number.isNaN(Number(minVal))) {
                        if (max < Number(minVal)) return 'Max must be >= Min';
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <TextInput placeholder="₹12,00,000" type="number" {...field} />
                  )}
                />
                {showFieldError('MaxSalary') && (
                  <Text size="xs" c="red">
                    {errors.MaxSalary?.message}
                  </Text>
                )}
              </Box>
            </Group>
          </Box>

          <Box style={{ flex: 1 }}>
            <label
              style={{
                fontSize: 14,
                fontWeight: 500,
                marginBottom: 6,
                display: 'block',
              }}
            >
              Application Deadline
            </label>
            <Controller
              name="ApplicationDeadline"
              control={control}
              rules={{ required: 'Please select the application deadline' }}
              render={({ field }) => (
                <input
                  type="date"
                  {...field}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 6,
                    border: '1px solid #ddd',
                    fontSize: 14,
                    color: '#333',
                  }}
                />
              )}
            />
            {showFieldError('ApplicationDeadline') && (
              <Text size="xs" c="red">
                {errors.ApplicationDeadline?.message}
              </Text>
            )}
          </Box>
        </Group>

        {/* Description Fields */}
        <Textarea label="Job Description" minRows={4} mb="sm" {...register('JobDescription')} />
        <Textarea label="Requirements" minRows={3} mb="sm" {...register('Requirements')} />
        <Textarea label="Responsibilities" minRows={3} mb="sm" {...register('Responsibilities')} />

        {/* Buttons */}
        <Group justify="space-between" mt="md">
          <Button variant="outline" color="gray" onClick={() => { reset(); onClose(); }}>
            Save Draft
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Publish »
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
