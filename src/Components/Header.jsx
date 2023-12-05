import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Header(){

    const navigate = useNavigate()
    return (
        <div className="font-body flex flex-col items-center ">
          <h1 onClick={() => { navigate('/') }} className="font-bold text-7xl italic text-center">SongSynth</h1>
          <div className="space-x-4">
            <button onClick={() => { navigate('/') }} className=" text-3xl relative top-8
                 bg-transparent hover:bg-green-600 hover:text-black py-2 px-4 border border-black hover:border-transparent">Home</button>
            <button onClick={() => { navigate('/about') }} className="text-3xl relative top-8
                 bg-transparent hover:bg-green-600 hover:text-black py-2 px-4 border border-black hover:border-transparent">About</button>
            <button onClick={() => { navigate('/my-stats') }} className="text-3xl relative top-8
                 bg-transparent hover:bg-green-600 hover:text-black py-2 px-4 border border-black hover:border-transparent">My Stats</button>
          </div>
        </div>
      );
}


export default Header