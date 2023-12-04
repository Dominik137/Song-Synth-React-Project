import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Header.css"

function Header(){

    const navigate = useNavigate()

    return(
        <div className="header" >
            <h1 id="Title">SongSynth</h1>
           <button onClick={()=>{navigate('/')}} className="headerButton">Home</button>
            <button onClick={()=>{navigate('/about')}} className="headerButton">About</button> 
            <button onClick={()=>{navigate('/my-stats')}} className="headerButton">My Stats</button> 
        </div>
    )
}


export default Header