
import React, { ReactNode } from 'react'
import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Doorbin",
    description: "Streamlined Video Conferencing",
    icons: {
        icon: "../Asset/doorbin-favicon-black.png"
    }
};
export default function PagesLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <main>
            <StreamVideoProvider>
                {children}
            </StreamVideoProvider >
        </main>
    )
}
