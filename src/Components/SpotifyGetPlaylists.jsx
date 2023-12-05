import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaylistCard from './PlaylistCard'

const SpotifyGetPlaylists = () => {
    const [token, setToken] = useState('')
    const [data, setData] = useState([])
    const playListEnpoint = 'https://api.spotify.com/v1/me/playlists'

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    },[])

    const hadleGetPlaylist = () => {
        axios
        .get(playListEnpoint,{
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then((r) => {
            setData(r.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
    return(
        <div name={"Playlist"}>
        <button className="showPlaylistButton" onClick={hadleGetPlaylist} >Show your Playlist</button>
        <PlaylistCard data={data}/>
        </div>
    )
}

export default SpotifyGetPlaylists 