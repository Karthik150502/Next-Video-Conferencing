'use client'
import { cn } from '@/lib/utils'
import { LucideProps } from 'lucide-react'
import React from 'react'

type Props = {
    title: string,
    description: string,
    className: string,
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    onClick: () => void
}

export default function Card({ title, description, className, onClick, Icon }: Props) {
    return (
        <div className={cn("px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer", className)} onClick={onClick}>
            <div className='flex items-center justify-center glassmorphism size-12 rounded-[10px]'>
                <Icon size={30} />
            </div>

            <div className="flex flex-col gap-2">
                <h1 className='text-2xl font-extrabold'>{title}</h1>
                <p className='text-lg font-normal'>{description}</p>
            </div>
        </div >
    )
}
