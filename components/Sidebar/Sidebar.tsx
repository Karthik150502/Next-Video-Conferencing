'use client'
import React from 'react'
import { SIDE_BAR_ITEMS } from '@/config'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function Sidebar() {

    const pathname = usePathname()


    return (
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 pb-6 pt-28 text-white max-sm:hidden lg:w-[264px] '>
            <div className='flex flex-1 flex-col gap-6'>
                {
                    SIDE_BAR_ITEMS.map((item) => {
                        const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                        return <Link href={item.route} key={item.label} className={cn("flex  gap-x-1 p-4 items-center rounded-lag justify-between hover:scale-110  duration-400 origin-center transition-all hover:duration-300",
                            { "menu-btn": isActive }
                        )}>
                            <p className={cn("text-sm max-sm:hidden max-md:hidden", {
                                'scale-110': isActive
                            })}>{item.label}</p>
                            <item.icon strokeWidth={1.5} size={15} />
                        </Link>
                    })
                }
            </div>
        </section >
    )
}
