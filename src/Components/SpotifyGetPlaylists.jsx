import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaylistCard from './PlaylistCard'

const SpotifyGetPlaylists = () => {
    const [token, setToken] = useState('')
    const [data, setData] = useState([])
    const [button, setButton] =useState(true)
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

    function handClickOne(){
        hadleGetPlaylist()
        setButton(false)
    }

    function handleClickTwo(){
        setButton(true)
        setData([])
    }
    
    return(
        <div className="">
        <div name={"Playlist"}>   
        { button ?
            <button className="showPlaylistButton" onClick={handClickOne}  >Show your Playlists</button> :
        <button className="showPlaylistButton" onClick={handleClickTwo}>Hide Playlists</button>
        }
        <PlaylistCard data={data}/>
        </div>
        </div>
    )
}

export default SpotifyGetPlaylists 