import React, { useState } from "react";


function PlaylistCard({data}){

    
    return (
       <>
       <div>
        {data.items?.map((item)=>{
           return(
             <>
           <div onClick={()=>{window.open(`${item.external_urls.spotify}`)}} className="playlistCard">
           <p className="text-title">{item.name}</p>
            {item.images.length ? <img width={"100px"} src={item.images[0].url} alt=""/> : <div>No Image</div>}
          </div>
           </>)
        })}
       </div>
       </>
    )
}
export default PlaylistCard