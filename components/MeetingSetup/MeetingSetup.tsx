'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'

export default function MeetingSetup({ setisSetupComplete }: { setisSetupComplete: (val: boolean) => void }) {
    const call = useCall();


    console.log("Call from meeting setup = ", call)



    if (!call) {
        throw new Error("Use call must be used in the inside StreamCall component.")
    }


    const [isMicAndCamToggledOn, setIsMicAndCamToggledOn] = useState<boolean>(false)





    useEffect(() => {

        if (isMicAndCamToggledOn) {
            call?.camera.disable()
            call?.microphone.disable()
        } else {
            call?.camera.enable()
            call?.microphone.enable()
        }
    }, [isMicAndCamToggledOn, call?.camera, call?.microphone])


    return (
        <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
            <h1 className="text-2xl font-bold ">Setup</h1>
            <VideoPreview />

            <div className='flex h-16 items-center justify-center gap-3'>
                <label htmlFor="" className='flex items-center justify-center gap-2 font-medium'>
                    <input type="checkbox" checked={isMicAndCamToggledOn} onChange={(e) => {
                        setIsMicAndCamToggledOn(e.target.checked)
                    }} />
                    <p>
                        Join with Mic and Camera Off
                    </p>
                </label>
                <DeviceSettings />
            </div>
            <Button className='rounded-md bg-green-500 px-4 py-4 text-lg' onClick={() => {
                call.join()
                setisSetupComplete(true)
            }}>Join Meeting</Button>
        </div>
    )
}
