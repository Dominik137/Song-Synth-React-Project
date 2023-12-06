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
        return(<div className="savedArtistCard">
            <h1 className="myStatsText">{item.name}</h1>
            <p className="myStatsText">Followers: {item.followers.toLocaleString()}</p>
            {item.image ? <img width={"85px"} height={"85px"} src={item.image.url} alt=""/> : <div>No Image</div>}

        </div>)

    })


    return(
        <>
        <div className="container">
        <div className="column">
            <div>
              <h1>Saved Artists!</h1>  
                <div>{mapSavedArtists}</div>
            </div>
        </div>
        <div className="middleColumn"></div>
        <div className="column"></div>
       </div>
{/* make mulyiple columns */}
        </>
    )
}

export default MyStats