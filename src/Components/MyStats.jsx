import { data } from "autoprefixer";
import React, { useState } from "react";

function MyStats(){

    const [savedArtists, setSavedArtists] = useState([])


    useState(()=>{
        fetch('http://localhost:3000/savedArtists')
        .then((resp)=>resp.json())
        .then((data)=>setSavedArtists(data))
    },[])
    console.log(savedArtists)

    const mapSavedArtists = savedArtists.map((item)=>{
        return(<div>
            <h1 className="font-normal text-md text-center">{item.name}</h1>
            <p>followers {item.followers.toLocaleString()}</p>
            {/* <img>{item.image.url}</img> */}

        </div>)

    })


    return(
        <div className=" flex justify-center items-center">
            <h1 className="font-body font-bold text-4xl ">
                Saved Artists!
                {mapSavedArtists}
            </h1>
        </div>
    )
}

export default MyStats