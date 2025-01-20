import type { Metadata } from 'next';

import './styles/index.css';

import type { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
    title: 'nextapp',
    description: 'Next.js',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
    <html lang="en" suppressHydrationWarning>
        <body>{children}</body>
    </html>
);

export default RootLayout;
