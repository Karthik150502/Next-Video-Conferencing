import React from 'react'
import "./styles.css"
export default function LoadingSmall({ status }: { status?: string }) {
    return (
        <main className="flex flex-col items-center justify-center h-full w-full">

            <div className="flex flex-col item-center justify-center">
                <div className="loading-anim-con">
                    <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                {
                    status && <div className="progress-status">
                        <p className="text-base font-thin leading-6">{status}</p>
                    </div>
                }

            </div>
        </main>
    )
}
