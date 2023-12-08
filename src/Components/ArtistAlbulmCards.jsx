import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SongCard from './SongCard'

const ArtistAlbumCards = ({id}) => {
    const [token, setToken] = useState('');
    const [data, setData] = useState([]);
    const [albumId, setAlbumId] = useState("")
    const [albulmCover ,setAlbulmCover] = useState("")
    const albulmListEnpoint = `https://api.spotify.com/v1/artists/${id}/albums`
  
    useEffect(() => {
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
      }
      
      const handleGetAlbulms = async () => {
        try {
          const response = await axios.get(albulmListEnpoint, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          
          setData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  console.log(data)
      handleGetAlbulms(); // This will run only once when the component mounts
  
    }, [albulmListEnpoint, token, id]); 
    return (
        <>
        <div>
         {data.items?.map((item)=>{
            
            return(
              <>
              <div onClick={()=>{setAlbulmCover(item.images[0])}}>
              <div  onClick={() => {albumId ? setAlbumId("") : setAlbumId(item.id)} }
               className="albulmCard"> 
            <div className="albulmbabyDiv" >
            <p className="album-text-title">{item.name}</p>
            <div>
            <p className="albulm-track-total">Total Tracks: {item.total_tracks}</p>
            <p className="albulm-track-release">Release Date: <br/>
            {item.release_date}</p></div>
             <div>{item.images.length ? <img className="albulmImage"
             onClick={(e)=>{{e.stopPropagation()}window.open(`${item.external_urls.spotify}`)}}
              width={"110px"} height={"110px"} src={item.images[0].url} alt=""/> : <div>No Image</div>}</div>
              
             <button onClick={(e)=>{
                e.stopPropagation()
            fetch('http://localhost:3000/savedAlbulms',{
                method:"POST",
                 headers:{ 'Content-Type': 'application/json'
                 },
                body: JSON.stringify({
                    "name": item.name,
                    "image": item.images[0],
                    "totalTracks": item.total_tracks,
                    "releaseDate": item.release_date,
                    "albumLink": item['external_urls'].spotify
                })
                 })
                 
            }} className="saveAlbButton">Save</button>
           </div> 
           </div>
           
           </div>
           {albumId === item.id  ? < SongCard albulmCover={albulmCover} albumId={albumId}/> : <></>} 
            </>)
         })}
        </div>
        </>
     )
    }

export default ArtistAlbumCards