'use client'
import React, { useState } from 'react'
import { LayoutEnums, LayoutLabels } from '@/lib/layoutTypes'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import { cn } from '@/lib/utils';
import { LayoutList, UsersIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSearchParams } from 'next/navigation';
import EndCallButton from '../EndCallButton';
import FullScreenLoading from '../loader/loading';
import { useRouter } from 'next/navigation';
export default function MeetingRoom() {



    const searchParams = useSearchParams();

    const isPersonalroom = !!searchParams.get("personal")
    const [layout, setLayout] = useState<LayoutEnums>(LayoutEnums.SPEAKER_LEFT);
    const [showParticipants, setShowParticipants] = useState(false)
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();
    const router = useRouter();

    if (callingState != CallingState.JOINED) return <FullScreenLoading />


    const CallLayout = () => {
        switch (layout) {
            case LayoutEnums.GRID:
                return <PaginatedGridLayout />
            case LayoutEnums.SPEAKER_RIGHT:
                return <SpeakerLayout participantsBarPosition={"left"} />
            default:
                return <SpeakerLayout participantsBarPosition={"right"} />
        }
    }



    return (
        <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className="relative flex size-full items-center justify-center">
                <div className='flex size-full max-w-[1000px] items-center'>
                    <CallLayout />
                </div>

                <div className={cn("h-[calc(100vh-86px)] hidden ml-2",
                    { 'show-block': showParticipants }
                )}>
                    <CallParticipantsList onClose={() => { setShowParticipants(false) }} />
                </div>
            </div>

            <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
                <CallControls onLeave={() => {
                    router.push("/")
                }} />
                <DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenuTrigger className='cursor-pointer rounded-full bg-[#19232d] p-2 hover:bg-[#4c535b]'>
                            <LayoutList />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className='border-dark-1 > bg-dark-1 text-white'>
                        {
                            [LayoutEnums.GRID, LayoutEnums.SPEAKER_LEFT, LayoutEnums.SPEAKER_RIGHT].map((item) => {
                                return <DropdownMenuItem key={item} className='cursor-pointer' onClick={() => {
                                    setLayout(item)
                                }}>{LayoutLabels[item]}</DropdownMenuItem>
                            })
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <button onClick={() => {
                    setShowParticipants((prev) => !prev)
                }}>
                    <div className="'cursor-pointer rounded-full bg-[#19232d] p-2 hover:bg-[#4c535b]">
                        <UsersIcon strokeWidth={1.5} />
                    </div>
                </button>
                {isPersonalroom && <EndCallButton />}
            </div>
        </section>
    )
}
