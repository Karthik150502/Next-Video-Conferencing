'use client'
import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from 'next/image'
import nobg_logo from "@/Asset/doorbin-high-resolution-logo-white-transparent.png"
import { Menu as Hamburger } from 'lucide-react'
import Link from 'next/link'
import { SIDE_BAR_ITEMS } from '@/config'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
export default function MobNav() {

    const pathname = usePathname();

    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger asChild>
                    <Hamburger strokeWidth={1} fontSize={25} className='sm:hidden' />
                </SheetTrigger>
                <SheetContent className="border-none bg-dark-1" side={"right"}>
                    <Link href={"/"} className='flex items-center gap-1 hover:animate-pulse w-fit lg:ml-10 transition-all'>
                        <Image src={nobg_logo} alt='Doorbin Logo' height={100} width={100} className='' />
                    </Link>

                    <div className="h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto ">
                        <SheetClose asChild>
                            <section className='flex flex-col text-white gap-y-2 pt-16 px-2'>
                                <div className='flex flex-1 flex-col gap-6'>

                                    {
                                        SIDE_BAR_ITEMS.map((item) => {
                                            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                                            return <SheetClose key={item.label} asChild>
                                                <Link href={item.route} className={cn("flex gap-x-2 p-4 items-center justify-between rounded-md w-full hover:scale-110  duration-400 origin-center transition-all hover:duration-300",
                                                    { "menu-btn scale-110": isActive }
                                                )}>
                                                    <p className='font-semibold'>{item.label}</p>
                                                    <item.icon strokeWidth={2} size={15} />
                                                </Link>
                                            </SheetClose>
                                        })
                                    }
                                </div>
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}
