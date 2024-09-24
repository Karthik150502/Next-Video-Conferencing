import React from 'react'

export default function page({ params }: { params: { id: string } }) {
    return (
        <div>
            <p className='text-white'>Meeting #room: {params.id}</p>
        </div>
    )
}
