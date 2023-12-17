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
    
    const handleDeleteArtists = (id) => {
        fetch(`http://localhost:3000/savedArtists/${id}`, {
          method: "DELETE"
        })
        .then(response => {
          if (response.ok) {
            // Update the state to reflect the deleted item
            setSavedArtists(prevSavedArtists => prevSavedArtists.filter(item => item.id !== id));
          }
        })
        .catch(error => {
          console.error('Error deleting the item:', error);
        });
      };
      
    

    const mapSavedArtists = savedArtists.map((item)=>{
        const id = item.id
        return(<div onClick={()=>{window.open(`${item.artistLink}`)}}
        className="savedArtistCard">
            <h1 className="myStatsText">{item.name}</h1>
            <p className="myStatsText">Followers: {item.followers.toLocaleString()}</p>
            {item.image ? <img width={"85px"} height={"85px"} src={item.image.url} alt=""/> : <div>No Image</div>}
            <div><button className="deleteButton" onClick={(e)=>{
                 e.stopPropagation()
                 handleDeleteArtists(id)}}>Delete</button></div>

        </div>)

    })

    useState(()=>{
        fetch('http://localhost:3000/savedAlbulms')
        .then((resp)=>resp.json())
        .then((data)=>setSavedAlbulms(data))
    },[])


    const handleDeleteAlbulms = (id) => {
        fetch(`http://localhost:3000/savedAlbulms/${id}`, {
          method: "DELETE"
        })
        .then(response => {
          if (response.ok) {
            // Update the state to reflect the deleted item
            setSavedAlbulms(prevSavedAlbulms => prevSavedAlbulms.filter(item => item.id !== id));
          }
        })
        .catch(error => {
          console.error('Error deleting the item:', error);
        });
      };

    console.log(savedAlbulms)

    const mapSavedAlbulms = savedAlbulms.map((item)=>{
        const id = item.id
        return(<div onClick={()=>{window.open(`${item.albumLink}`)}}
        className="savedArtistCard">
            <h1 className="saveAlbulmName">{item.name}</h1>
            {item.image ? <img width={"85px"} height={"85px"} src={item.image.url} alt=""/> : <div>No Image</div>}
            <p className="savedTotalTracks">Total Tracks: {item.totalTracks}</p>
            <p className="savedReleaseDate">Release Date: {item.releaseDate} </p>
            <div><button className="deleteButton" 
                onClick={(e)=>{
                    e.stopPropagation()
                    handleDeleteAlbulms(id)}}
            >Delete</button></div>
        </div>)

    })
// our saved songs displaying
    useState(()=>{
        fetch('http://localhost:3000/savedSongs')
        .then((resp)=>resp.json())
        .then((data)=>setSavedSongs(data));
    },[])
    const handleDeleteSongs = (id) => {
        fetch(`http://localhost:3000/savedSongs/${id}`, {
          method: "DELETE"
        })
        .then(response => {
          if (response.ok) {
            // Update the state to reflect the deleted item
            setSavedSongs(prevSavedSongs => prevSavedSongs.filter(item => item.id !== id));
          }
        })
        .catch(error => {
          console.error('Error deleting the item:', error);
        });
      };
      
    const mapSavedSongs = savedSongs.map((item)=>{
        const id = item.id
        return(<div onClick={()=>{window.open(`${item.songLink}`)}} className="savedSongCard">
            <h1 className="saveAlbulmName">{item.name}</h1>
            <h2 className="savedSongArtistText">{item.artistName}</h2>
            <div>
                {item.image ? <img width={"85px"} height={"85px"} src={item.image.url} alt=""/> : <div>No Image</div>}
            </div>
            <button className="deleteButton" onClick={(e)=>{
                 e.stopPropagation()
                 handleDeleteSongs(id)}}>Delete
            </button>
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