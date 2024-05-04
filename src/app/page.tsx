'use client'

// VS code was complaining so I imported it in the other format
//const NextUIProvider = require('@nextui-org/react');
import {NextUIProvider} from '@nextui-org/react';

import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function Home() {
  return (
    <UserProvider>
      <NextUIProvider>
        <main>
        </main>
      </NextUIProvider>
    </UserProvider>
  );
}
