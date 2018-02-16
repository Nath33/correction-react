import React from 'react'

export const AlbumList = ({ albums, onSelectAlbum }) => (
    <ul>
        {albums.map(({ id, title }) => (
            <li key={id} onClick={onSelectAlbum.bind(null, id)}>{title}</li>
        ))}
    </ul>
)
