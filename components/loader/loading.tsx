import React from 'react'
import "./styles.css"
export default function FullScreenLoading({ status }: { status?: string }) {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen w-full">

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
