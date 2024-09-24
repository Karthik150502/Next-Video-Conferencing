'use client'
import { Plus, VideoIcon, Clock11Icon, UserPlus } from 'lucide-react'
import React, { useState } from 'react'
import Card from '../CardHero/Card'
import { MeetingEnum } from '@/lib/meetingTypes'
import { useRouter } from 'next/navigation'
import MeetingModal from '../MeetingModal/MeetingModal'
export default function MeetingTypeList() {


    const [meetingState, setMeetingState] = useState<MeetingEnum | undefined>();
    const router = useRouter();


    const createMeeting = () => {
        
    }

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <Card
                title='New Meeting'
                description='Start a new Meeting'
                onClick={() => { setMeetingState(MeetingEnum.INSTANT_MEETING) }}
                className='bg-orange-1'
                Icon={Plus}
            />
            <Card
                title='Schedule Meeting'
                description='Plan a new Meeting'
                onClick={() => { setMeetingState(MeetingEnum.SCHEDULE_MEETING) }}
                className='bg-purple-1'
                Icon={Clock11Icon}
            />
            <Card
                title='View Recordings'
                description='Check out your Recordings'
                onClick={() => { router.push("/recordings") }}
                className='bg-blue-2'
                Icon={VideoIcon}
            />
            <Card
                title='Join Meeting'
                description='Via Invitation link'
                onClick={() => { setMeetingState(MeetingEnum.JOIN_MEETING) }}
                className='bg-green-1'
                Icon={UserPlus}
            />

            <MeetingModal
                isOpen={meetingState === MeetingEnum.INSTANT_MEETING}
                onClose={() => { }}
                title="Start a new Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />

        </section >
    )
}
