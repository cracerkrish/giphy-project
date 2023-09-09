import React, { useState, useEffect } from 'react'
import './Media.css'
import { fetchSearchedGiphys, fetchTrendingGiphys } from '../api/giphyApi';
import TrendingGiphy from './TrendingGiphy'
import giphyArtists from '../artists'
import ArtistGiphy from './ArtistGiphy';
import ClipsGiphySection from './ClipsGiphySection';
import StoriesGiphySection from './StoriesGiphySection';

const Media = () => {
    const [trending, setTrending] = useState([]);
    const [artists, setArtists] = useState([]);
    const [clips, setClips] = useState([]);
    const [stories, setStories] = useState([]);

    const randomizeData = (content) => {
        return content.data.sort(() => Math.random() - 0.5);
    }

    const getTrendingGiphys = async () => {
        //get the giphys by doing an API call 
        const trending = await fetchTrendingGiphys();
        //set the trending Giphys!
        setTrending(randomizeData(trending.data));
    };

    const getArtists = async () => {
        const artists = await Promise.all(
            giphyArtists.map(async (giphyArtist) => {
                return fetchSearchedGiphys(giphyArtist).then((res) => res.data.data);
            })
        );
        //map through giphy artists
        //with each artist make a api call
        //wait the results nd get that
        setArtists(artists.flat());
    };

    const getSearchedGiphys = async (query, setState) => {
        const searched = await fetchSearchedGiphys(query);
        setState(randomizeData(searched.data));
    };
    useEffect(() => {
        getTrendingGiphys();
        getArtists();
        getSearchedGiphys("coffee", setClips);
        getSearchedGiphys("pose", setStories);
    }, [])


    return (
        <div className='media'>

            <div className='row'>
                <div className='row-header'>
                    <img src='images/trending.svg' alt='' />
                    <h1>Trending</h1>

                </div>
                <div className='trending-container'>
                    {trending?.map((trendingGiphy, index) => {
                        return <TrendingGiphy giphy={trendingGiphy} key={index} />
                    })}
                </div>
            </div>
            <div className='row'>
                <div className='row-header'>
                    <img src='images/artists.svg' alt='' />
                    <h1>Artist</h1>
                </div>
                <div className="artists-container">
                    {artists.map((artistGiphys, index) => {
                        return <ArtistGiphy giphy={artistGiphys} key={index} />
                    })}
                </div>
            </div>


            <div className='row'>
                <div className='row-header'>
                    <img src='images/clips.svg' alt='' />
                    <h1>Clips</h1>
                </div>
                <div className="clips-container">
                    <ClipsGiphySection giphysArray={clips} />
                </div>
            </div>

            <div className='row'>
                <div className='row-header'>
                    <img src='images/stories.svg' alt='Stories' />
                    <h1>Stories</h1>
                </div>
                <div className="stories-container">
                    <StoriesGiphySection giphysArray={stories} />
                </div>

            </div>

        </div >
    )
}

export default Media