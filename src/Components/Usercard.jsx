import React from "react";

function Usercard({data}){
  
    return (
            <>
           {data.images ?  
           <div onClick={()=>{window.open(`${data.external_urls.spotify}`)}} className="playlistCard">
           <p className="text-title">{data.display_name}</p>
            <img width={"100px"} src={data.images[0].url} alt=""/> 
                  </div>
                  : <></>}
               </>       
    )
    }
export default Usercard