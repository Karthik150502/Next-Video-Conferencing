'use client'
import { Plus, VideoIcon, Clock11Icon, UserPlus } from 'lucide-react'
import React, { useState } from 'react'
import Card from '../CardHero/Card'
import { MeetingEnum } from '@/lib/meetingTypes'
import { useRouter } from 'next/navigation'
import MeetingModal from '../MeetingModal/MeetingModal'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useUser } from '@clerk/nextjs'
import { useToast } from '@/hooks/use-toast'
import { Copy } from 'lucide-react'
import checkedLogo from "../../Asset/otherIcons/check/icons8-checkmark-200.png"
import { Textarea } from '../ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from '../ui/input'


type MeetingInfo = {
    dateTime?: Date,
    description: string,
    link: string
}


export default function MeetingTypeList() {


    const [meetingState, setMeetingState] = useState<MeetingEnum | undefined>();
    const [values, setValues] = useState({ dateTime: new Date() } as MeetingInfo);
    const [callDetails, setcallDetails] = useState<Call>()

    const router = useRouter();

    const { user } = useUser();

    const client = useStreamVideoClient();
    const toast = useToast();


    const createMeeting = async () => {
        if (!client || !user) return;
        console.log("Client and user present")
        try {
            if (!values.dateTime) {
                toast.toast({
                    title: "Please select date and time.",
                    variant: "warning"
                })
                console.log("Please select date and time")
                return;
            }


            const id = crypto.randomUUID();
            const call = client.call("default", id);

            if (!call) {
                throw new Error("Failed to call.")
            }
            console.log(id)

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant Meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })


            setcallDetails(call)
            if (!values.description) {
                console.log("Meetging Created.")
                router.push(`meeting/${call.id}`)
                toast.toast({
                    title: `Meeting created`,
                })
                return;
            }
        } catch (e) {
            console.log(e)
            toast.toast({
                title: "Failed to create meeting",
                variant: "destructive"
            })
        }

    }


    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

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

            {
                !callDetails ? (
                    <MeetingModal
                        isOpen={meetingState === MeetingEnum.SCHEDULE_MEETING}
                        onClose={() => { setMeetingState(undefined) }}
                        title="Create a Meeting"
                        className="text-center"
                        handleClick={createMeeting}
                    >
                        <div className='flex flex-col gap-2.5'>
                            <label htmlFor="" className='text-base text-normal leading-[26px]'>
                                <p className='float-left text-sm my-1'>Add a description</p>
                                <Textarea className="bg-dark-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0 max-h-[150px]" onChange={(e) => {
                                    setValues((prev) => {
                                        return { ...prev, description: e.target.value }
                                    })
                                }} maxLength={100} />
                            </label>
                        </div>
                        <div className='flex flex-col w-full gap-0.5'>
                            <label htmlFor="" className='text-base text-normal leading-[26px]'>
                                <p className='float-left text-sm my-1'>Select Date and Time</p>
                            </label>
                            <ReactDatePicker
                                selected={values.dateTime}
                                onChange={(date) => {
                                    setValues((prev) => {
                                        return { ...prev, dateTime: date! }
                                    })
                                }}
                                showTimeSelect
                                timeFormat='HH:mm'
                                timeIntervals={15}
                                timeCaption='time'
                                dateFormat={"MMMM d, yyyy h:mm aa"}
                                className='w-full rounded bg-dark-2 focus:outline-none p-2'
                            />
                        </div>
                    </MeetingModal>
                ) : (
                    <MeetingModal
                        isOpen={meetingState === MeetingEnum.SCHEDULE_MEETING}
                        onClose={() => { setMeetingState(undefined) }}
                        title="Meeting Created"
                        className="text-center"
                        handleClick={() => {
                            navigator.clipboard.writeText(meetingLink)
                            toast.toast({
                                title: "Link copied",
                                variant: "success"
                            })
                        }}
                        image={checkedLogo}
                        ButtonIcon={Copy}
                        buttonText='Copy Meeting Link'
                    />
                )
            }
            <MeetingModal
                isOpen={meetingState === MeetingEnum.INSTANT_MEETING}
                onClose={() => { setMeetingState(undefined) }}
                title="Start a new Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />

            <MeetingModal
                isOpen={meetingState === MeetingEnum.JOIN_MEETING}
                onClose={() => { setMeetingState(undefined) }}
                title="Enter the meeting link."
                className="text-center"
                buttonText="Join meeting"
                handleClick={() => { router.push(values.link) }}
            >
                <label htmlFor="meeting-link" className='text-base text-normal leading-[26px]'>
                    <Input onChange={(e) => {
                        setValues((prev) => ({ ...prev, link: e.target.value }))
                    }} className='bg-dark-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0' id='meeting-link' placeholder='Meeting link' />
                </label>
            </MeetingModal>

        </section >
    )
}
