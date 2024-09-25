import React from 'react'
import { montserrat300 } from '@/app/fonts/montserrat';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Doorbin",
    description: "Streamlined Video Conferencing",
    icons: {
        icon: "../Asset/doorbin-favicon-black.png"
    }
};
export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className={`${montserrat300.className} antialiased`}>
            <Navbar />

            <div className='flex'>
                <Sidebar />
                <section className='flex flex-1 flex-col min-h-screen px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
                    <div className='w-full'>
                        {children}
                    </div>
                </section>
            </div>
        </main>
    )
}
