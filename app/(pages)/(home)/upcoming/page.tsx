import CallList from '@/components/CallList/CallList'
import React from 'react'
import { CallListEnum } from '@/lib/callListType'
export default function Upcoming() {
    return (
        <section className='size-full flex flex-col gap-10 text-white'>
            <CallList type={CallListEnum.UPCOMING} />
        </section>
    )
}
