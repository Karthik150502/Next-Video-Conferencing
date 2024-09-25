import CallList from '@/components/CallList/CallList'
import { CallListEnum } from '@/lib/callListType'
import React from 'react'

export default function Previous() {
    return (
        <section className='size-full flex flex-col gap-10 text-white'>
            <CallList type={CallListEnum.ENDED} />
        </section>
    )
}
