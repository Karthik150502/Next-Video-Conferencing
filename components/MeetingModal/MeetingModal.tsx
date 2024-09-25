import { LucideProps } from 'lucide-react'
import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Image, { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'


type Props = {
    title: string,
    isOpen: boolean,
    onClose: () => void,
    className?: string,
    handleClick?: () => void,
    buttonText?: string,
    image?: StaticImageData,
    children?: ReactNode,
    ButtonIcon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    description?: string
}

export default function MeetingModal({ title, isOpen, onClose, className, handleClick, buttonText, ButtonIcon, image, children, description }: Props) {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={cn("flex max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white", className)}>
                <div className="flex flex-col gap-6">
                    {
                        image && <div className='flex justify-center'>
                            <Image src={image} alt="Modal image" width={72} height={72} />
                        </div>
                    }
                    <DialogTitle className={cn("text-3xl font-bold leading-[42px]")}>
                        {title}
                    </DialogTitle>
                    {children}
                    <Button className='bg-blue-2 transition-colors hover:bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0 flex gap-x-2' onClick={handleClick}>
                        {ButtonIcon && <ButtonIcon size={12} />}
                        {buttonText || "Schedule Meeting"}
                    </Button>
                </div>
                <DialogHeader>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
