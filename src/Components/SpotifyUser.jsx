import React from "react";
import Usercard from "./Usercard";
import { useState, useEffect } from "react";
import axios from "axios";

function SpotifyTop(){

    const [token, setToken] = useState('')
    const [data, setData] = useState([])
    const [button, setButton] =useState(true)
    const artistsEndpoint = 'https://api.spotify.com/v1/me'

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    },[])

    const hadleGetArtists = () => {
         axios
        .get(artistsEndpoint,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((r) => {
            setData(r.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    function handClickOne(){
        hadleGetArtists()
        setButton(false)
    }

    function handleClickTwo(){
        setButton(true)
        setData("")
    }
    
    return(
        <div className="">
        <div name={"playlist"}>   
        { button ?
            <button className="showPlaylistButton" onClick={handClickOne}  >Show your Profile</button> :
        <button className="showPlaylistButton" onClick={handleClickTwo}>Hide Profile</button>
        }
        < Usercard data={data}/>
        </div>
        </div>
    )


   
}

export default SpotifyTop