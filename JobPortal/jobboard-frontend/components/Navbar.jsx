import React from 'react';
import Image from 'next/image';
import { Container, Group, Button, Box, Anchor, Paper } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export default function Navbar({ onOpenCreate }) {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px 0',
        backgroundColor: '#f9fafb',
      }}
    >
      <Paper
        shadow="sm"
        radius="xl"
        withBorder
        style={{
          width: '75%',
          maxWidth: 1000,
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          backgroundColor: '#fff',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        {/* ✅ Left section - Logo image */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={36}
            height={36}
            style={{ borderRadius: 8 }}
          />
        </div>

        {/* Center section - Navigation links */}
        <Group spacing={40}> {/* Reduced spacing from 80 to 40 */}
          {['Home', 'Find Jobs', 'Find Talents', 'About us', 'Testimonials'].map(
            (item) => (
              <Anchor
                key={item}
                href="#"
                underline="never"
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: '#333',
                  textDecoration: 'none',
                }}
              >
                {item}
              </Anchor>
            )
          )}
        </Group>

        {/* Right section - Create Jobs button */}
        <Button
          onClick={onOpenCreate}
          leftSection={<IconPlus size={16} />}
          style={{
            backgroundColor: '#5B21B6',
            borderRadius: 20,
            padding: '10px 18px',
          }}
        >
          Create Jobs
        </Button>
      </Paper>
    </Box>
  );
}




