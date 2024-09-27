
'use client'
import { CallListEnum } from '@/lib/callListType'
import React, { useEffect, useState } from 'react'
import { useGetCalls } from '@/hooks/use-get-calls'

import { Play } from 'lucide-react'
import { ListVideo, Headset, GalleryVerticalEnd } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import MeetingCard from '../MeetingCard/MeetingCard'
import { useToast } from '@/hooks/use-toast'
import LoadingSmall from '../loaderSmall/loader'

export default function CallList({ type }: { type: CallListEnum }) {

    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();

    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const { toast } = useToast();


    const router = useRouter();

    const getCalls = () => {
        switch (type) {
            case CallListEnum.ENDED:
                return endedCalls
            case CallListEnum.RECORDINGS:
                return recordings
            case CallListEnum.UPCOMING:
                return upcomingCalls
            default:
                return []
        }
    }


    const getNoCallsMesssage = () => {
        switch (type) {
            case CallListEnum.ENDED:
                return "No Previous calls"
            case CallListEnum.RECORDINGS:
                return "No Recordings"
            case CallListEnum.UPCOMING:
                return "No Upcoming calls"
            default:
                return ''
        }
    }


    useEffect(() => {
        const fetchRecordings = async () => {
            try {

                const callData = await Promise.all(callRecordings?.map((meeting: Call) => meeting.queryRecordings()) ?? []);

                const recordings = callData.filter((call) => call.recordings.length > 0).flatMap((call) => call.recordings);

                setRecordings(recordings);
            } catch (e) {
                console.log(e)
                toast({
                    title: "Try again later.",
                    variant: "destructive"
                })
            }
        }
        if (type === CallListEnum.RECORDINGS) {
            fetchRecordings();
        }
    }, [type, callRecordings])


    const calls = getCalls();
    const noCallsMessage = getNoCallsMesssage();


    if (isLoading) {
        return <LoadingSmall status='Loading meetings, kindly wait.' />
    }


    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {
                calls && calls.length > 0 ? (calls.map((meeting: Call | CallRecording) => {
                    return <MeetingCard
                        key={(meeting as Call).id}
                        Icon={type === CallListEnum.ENDED ? GalleryVerticalEnd : type === CallListEnum.RECORDINGS ? ListVideo : Headset}
                        title={(meeting as Call).state?.custom?.description || (meeting as CallRecording)?.filename || "Personal Meeting"}
                        date={(meeting as Call).state?.startsAt?.toLocaleString() || (meeting as CallRecording)?.start_time?.toLocaleString()}
                        isPreviousMeeting={type === CallListEnum.ENDED}
                        ButtonIcon1={type === CallListEnum.RECORDINGS ? Play : undefined}
                        handleClick={type === CallListEnum.RECORDINGS ? () => {
                            router.push(`/${(meeting as CallRecording).url}`)
                        } : () => {
                            router.push(`/meeting/${(meeting as Call).id}`)
                        }}
                        link={type === CallListEnum.RECORDINGS ? (meeting as CallRecording)?.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
                        buttonText={type === CallListEnum.RECORDINGS ? "Play" : "Start"}
                    />
                })) : (
                    <p>{noCallsMessage}</p>
                )
            }
        </div>
    )
}
