import React from 'react'

export const PhotoList = ({ photos }) => (
    <ul>
        {photos.map(({ id, thumbnailUrl }) => (
            <li key={id}>
                <img alt='image' src={thumbnailUrl} />
            </li>
        ))}
    </ul>
)
