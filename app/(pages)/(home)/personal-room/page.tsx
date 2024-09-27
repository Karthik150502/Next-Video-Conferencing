'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import { Copy, CopyCheck } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useGetCallById } from '@/hooks/use-get-call-by-id'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'



const Table = ({ title, description }: { title: string, description?: string }) => {
    return <div className='flex flex-col items-start gap-x-2 justify-start p-2 text-white'>
        <h1 className='text-base text-sky-1 lg:text-lg xl:min-w-32 font-bold'>{title}</h1>
        <p className='truncate text-xs max-sm:max-w-[320px] lg:text-sm'>{description}</p>
    </div>
}


export default function PersonalRoom() {


    const { user } = useUser();
    const [copied, setCopied] = useState<boolean>(false)
    const [copiedTimer, setCopiedTimer] = useState<NodeJS.Timeout | undefined>()
    const toast = useToast();
    const meetingId = user?.id
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
    const router = useRouter()
    const { call } = useGetCallById(meetingId!);
    const client = useStreamVideoClient();



    const startRoom = async () => {
        if (!client || !user) {
            return
        }
        let newCall;
        if (!call) {
            newCall = client.call("default", meetingId!);
            await newCall.getOrCreate({
                data: {
                    starts_at: new Date(Date.now()).toISOString()
                }
            })
        }

        router.push(`/meeting/${meetingId}?personal=true`)
    }

    const copyLink = () => {
        clearTimeout(copiedTimer)
        navigator.clipboard.writeText(meetingLink)
        setCopied(true)
        const toastId = toast.toast({
            title: "Copied meeting link",
            variant: "success"
        }).id;
        const timer = setTimeout(() => {
            setCopied(false)
            toast.dismiss(toastId)
        }, 2000)
        setCopiedTimer(timer)
    }


    return (
        <section className='size-full flex flex-col gap-10  text-white'>
            <p className='text-3xl font-extrabold'>Personal room</p>

            <div className="flex flex-col w-full gap-x-8 gap-y-1 xl:max-w-[900px] ">
                <Table title={"Topic"} description={`${user?.username}'s meeting room`} />
                <Table title={"Meeting Id"} description={meetingId} />
                <Table title={"Invite Link"} description={meetingLink} />
            </div>

            <div className="flex gap-5">
                <Button onClick={startRoom} className='bg-blue-1'>Start Meeting</Button>
                <Button className='bg-dark-2 gap-x-2' onClick={() => {
                    copyLink()
                }} disabled={copied}>
                    {copied ? <CopyCheck strokeWidth={1} /> : <Copy strokeWidth={1} />}
                    Copy Meeting Link
                </Button>
            </div>

        </section>
    )
}