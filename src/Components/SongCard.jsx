import React, { useState, useEffect } from "react";
import axios from "axios";

const SongCard = ({ albumId, albulmCover }) => {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const songEndPoint = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }

    axios
      .get(songEndPoint, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [songEndPoint, token, albumId]); // Include token and songEndPoint as dependencies
// console.log(data)
  return (
    <>
    
    <div className="songCard">
        <h1 className="songsTitle">Songs!</h1>
      {data.items?.map((item) => (
        
        <>
            <div>
                <a className="songNames" onClick={()=>{window.open(`${item.external_urls.spotify}`)}}>{item.track_number}. {item.name}
                </a>
                 </div>
                 <button onClick={(e)=>{
                    e.stopPropagation()
            fetch('http://localhost:3000/savedSongs',{
                method:"POST",
                 headers:{ 'Content-Type': 'application/json'
                 },
                body: JSON.stringify({
                    "name": item.name,
                    "image": albulmCover,
                    "trackNumber": item.track_number,
                    "songLink": item.external_urls.spotify,
                    "songId": item.id,
                    "artistName": item.artists.name
                })
                 })
                 
            }}
                    
                 className="saveSongButton">Save</button>
            <div></div>
        </>
      ))}
    </div>
    </>
  );
};


export default SongCard;
