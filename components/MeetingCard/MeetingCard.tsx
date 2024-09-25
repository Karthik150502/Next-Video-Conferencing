"use client";

import Image from "next/image";
// import { avatarImages } from "@/constants";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import { Copy } from "lucide-react";


type MeetingCardProps = {
    title: string;
    date: string;
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    isPreviousMeeting?: boolean;
    ButtonIcon1?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({
    Icon,
    title,
    date,
    isPreviousMeeting,
    ButtonIcon1,
    handleClick,
    link,
    buttonText,
}: MeetingCardProps) => {
    const { toast } = useToast();

    return (
        <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
            <article className="flex flex-col gap-5">
                <Icon size={28} strokeWidth={1} />
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-ellipsis whitespace-nowrap overflow-hidden">{title}</h1>
                        <p className="text-base font-normal">{date}</p>
                    </div>
                </div>
            </article>
            <article className={cn("flex justify-center relative", {})}>
                <div className="relative flex w-full max-sm:hidden">

                    {/* TODO: To add the avatars of the meeting dynamically. */}

                    {/* {avatarImages.map((img, index) => (
                        <Image
                            key={index}
                            src={img}
                            alt="attendees"
                            width={40}
                            height={40}
                            className={cn("rounded-full", { absolute: index > 0 })}
                            style={{ top: 0, left: index * 28 }}
                        />
                    ))}
                    <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
                        +5
                    </div> */}
                </div>
                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
                            {ButtonIcon1 && (
                                <ButtonIcon1 size={20} />
                            )}
                            &nbsp; {buttonText}
                        </Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast({
                                    title: "Link Copied",
                                });
                            }}
                            className="bg-dark-4 px-6"
                        >
                            <Copy
                                size={20}
                            />
                            &nbsp; Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </section>
    );
};

export default MeetingCard;