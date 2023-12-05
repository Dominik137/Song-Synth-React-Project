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
            <h1 className="myStatsText">{item.name}</h1>
            <p className="myStatsText">Followers: {item.followers.toLocaleString()}</p>
            {item.image ? <img width={"100px"} src={item.image.url} alt=""/> : <div>No Image</div>}

        </div>)

    })


    return(
        <div className="column">
            <h1 className="">
                Saved Artists!
                {mapSavedArtists}
            </h1>
        </div>
    )
}

export default MyStats