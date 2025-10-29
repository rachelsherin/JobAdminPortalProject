// pages/_debug_imports.js
import Navbar from '../components/Navbar';
import FiltersBar from '../components/FiltersBar';
import JobCard from '../components/JobCard';
import CreateJobModal from '../components/CreateJobModal';
import * as MantineCore from '@mantine/core';
import * as MantineNotif from '@mantine/notifications';

export default function DebugImports() {
  const info = {
    Navbar: typeof Navbar,
    FiltersBar: typeof FiltersBar,
    JobCard: typeof JobCard,
    CreateJobModal: typeof CreateJobModal,
    MantineCore_exports: Object.keys(MantineCore).slice(0, 10),
    MantineNotif_exports: Object.keys(MantineNotif),
  };
  return (
    <pre style={{ whiteSpace: 'pre-wrap', padding: 20 }}>
      {JSON.stringify(info, null, 2)}
    </pre>
  );
}
