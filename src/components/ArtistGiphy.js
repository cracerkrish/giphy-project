import React from 'react'
import "./ArtistGiphy.css"

const ArtistGiphy = ({ giphy }) => {
    return (
        <div className='arist-giphy' key={giphy.id}>
            <img src={giphy.images.downsized.url} alt={giphy.title} />

        </div>
    )
}

export default ArtistGiphy