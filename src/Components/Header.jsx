import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Header(){

    const navigate = useNavigate()
    return (
        <>
        <div className="header">
          <h1 onClick={() => { navigate('/') }} className="">SongSynth</h1>
          <div className="space-x-4">
            <button onClick={() => { navigate('/') }} className="button">Home</button>
            <button onClick={() => { navigate('/about') }} className="button">About</button>
            <button onClick={() => { navigate('/my-stats') }} className="button">My Stats</button>
          </div>
        </div>
        </>
      );
}


export default Header