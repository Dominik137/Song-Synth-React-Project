import { data } from "autoprefixer";
import React, { useState } from "react";

function MyStats(){

    const [savedArtists, setSavedArtists] = useState([])
    const [savedAlbulms, setSavedAlbulms] = useState([])
    const [savedSongs, setSavedSongs] = useState([])


    useState(()=>{
        fetch('http://localhost:3000/savedArtists')
        .then((resp)=>resp.json())
        .then((data)=>setSavedArtists(data))
    },[])
    console.log(savedArtists)

    const mapSavedArtists = savedArtists.map((item)=>{
        return(<div onClick={()=>{window.open(`${item.artistLink}`)}}
        className="savedArtistCard">
            <h1 className="myStatsText">{item.name}</h1>
            <p className="myStatsText">Followers: {item.followers.toLocaleString()}</p>
            {item.image ? <img width={"85px"} height={"85px"} src={item.image.url} alt=""/> : <div>No Image</div>}

        </div>)

    })

    useState(()=>{
        fetch('http://localhost:3000/savedAlbulms')
        .then((resp)=>resp.json())
        .then((data)=>setSavedAlbulms(data))
    },[])
    console.log(savedAlbulms)

    const mapSavedAlbulms = savedAlbulms.map((item)=>{
        return(<div onClick={()=>{window.open(`${item.albumLink}`)}}
        className="savedArtistCard">
            <h1 className="saveAlbulmName">{item.name}</h1>
            {item.image ? <img width={"85px"} height={"85px"} src={item.image.url} alt=""/> : <div>No Image</div>}
            <p className="savedTotalTracks">Total Tracks: {item.totalTracks}</p>
            <p className="savedReleaseDate">Release Date: {item.releaseDate} </p>
        </div>)

    })

    useState(()=>{
        fetch('http://localhost:3000/savedSongs')
        .then((resp)=>resp.json())
        .then((data)=>setSavedSongs(data))
    },[])

    const mapSavedSongs = savedSongs.map((item)=>{
        return(<div onClick={()=>{window.open(`${item.songLink}`)}} className="savedSongCard">
            <h1 className="saveAlbulmName">{item.name}</h1>
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
        <div className="middleColumn">
        <h1>Saved Songs!</h1>  
           {mapSavedSongs}
        </div>
        <div className="column">
            <h1>Saved Albums!</h1>
                <div >{mapSavedAlbulms}</div>
        </div>
       </div>
{/* make mulyiple columns */}
        </>
    )
}

export default MyStats