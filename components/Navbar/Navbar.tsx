import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import nobg_logo from "@/Asset/doorbin-high-resolution-logo-white-transparent.png"
import MobNav from '../MobNav/MobNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

export default function Navbar() {
    return (
        <nav className='flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
            <Link href={"/"} className='flex items-center gap-1 hover:animate-pulse w-fit lg:ml-10 transition-all'>
                <Image src={nobg_logo} alt='Doorbin Logo' height={100} width={100} className='' />
            </Link>

            <div className="flex justify-between gap-5">
                <SignedIn>
                    <UserButton />
                </SignedIn>

                <MobNav />
            </div>
        </nav>
    )
}
