// pages/_app.js
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider>
      <Notifications />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
