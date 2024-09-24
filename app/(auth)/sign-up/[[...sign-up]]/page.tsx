import React from 'react'
import { SignUp } from '@clerk/nextjs'
export default function SignUpPage() {
    return (
        <main className='flex w-full h-screen items-center justify-center '>
            <SignUp />
        </main>
    )
}
