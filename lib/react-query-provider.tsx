// lib/react-query-provider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export function ReactQueryProvider(
    { children }: { children: ReactNode }
) {
    const [client] = useState(() => new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            refetchOnMount: false,   // ou 'always' / 'never' selon ton besoin
            staleTime: 5 * 60 * 1000, // données fraîches 5 min
            gcTime: 10 * 60 * 1000,   // cache 10 min
          },
        },
    }));
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
}
