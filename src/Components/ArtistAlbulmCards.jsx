import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ArtistAlbumCards = ({id}) => {
    const [token, setToken] = useState('');
    const [data, setData] = useState([]);
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
  
      handleGetAlbulms(); // This will run only once when the component mounts
  
    }, [albulmListEnpoint, token, id]); 

    
    return (
        <>
        <div>
         {data.items?.map((item)=>{
            return(
              <>
              
              <div className="albulmCard">
            <div className="albulmbabyDiv" >
            <p className="album-text-title">{item.name}</p>
             <div>{item.images.length ? <img className="albulmImage"
             onClick={()=>{window.open(`${item.external_urls.spotify}`)}}
              width={"110px"} height={"110px"} src={item.images[0].url} alt=""/> : <div>No Image</div>}</div>
             <button onClick={()=>{
            fetch('http://localhost:3000/savedAlbulms',{
                method:"POST",
                 headers:{ 'Content-Type': 'application/json'
                 },
                body: JSON.stringify({
                    "name": item.name,
                    "image": item.images[0],
                })
                 })
                 
            }} className="saveAlbButton">Save</button>
           </div>
           </div>
            </>)
         })}
        </div>
        </>
     )
    }

export default ArtistAlbumCards