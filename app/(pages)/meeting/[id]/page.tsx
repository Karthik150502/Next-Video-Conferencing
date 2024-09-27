'use client'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import MeetingSetup from '@/components/MeetingSetup/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom/MeetingRoom';
import { useGetCallById } from '@/hooks/use-get-call-by-id';
import FullScreenLoading from '@/components/loader/loading';




export default function MeetingPage({ params: { id } }: { params: { id: string } }) {

    const { isLoaded } = useUser();
    const [isSetupComplete, setisSetupComplete] = useState<boolean>(false)

    const { call, isCallLoading } = useGetCallById(id);




    if (!isLoaded || isCallLoading) return <FullScreenLoading status="Loading, please wait..." />


    if (!call) return (
        <p className="text-center text-3xl font-bold text-white">
            Call Not Found
        </p>
    );




    return (
        <main className="h-screen w-full">
            <StreamCall call={call}>
                <StreamTheme>
                    {
                        isSetupComplete ? (
                            <MeetingRoom />
                        ) : (
                            <MeetingSetup setisSetupComplete={setisSetupComplete} />
                        )
                    }
                </StreamTheme>
            </StreamCall>
        </main>
    )
}
