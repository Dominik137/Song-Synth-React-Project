import React, { useState } from "react";


function PlaylistCard({data}){

    
    return (
       <>
       <div>
        {data.items?.map((item)=>{
           return( <>
           <p>{item.name}</p>
            {/* {console.log(item)} */}
            {item.images.length ? <img width={"100px"} src={item.images[0].url} alt=""/> : <div>No Image</div>}
            <a>{item.external_urls.spotify}</a>
           </>)
        })}
       </div>
       </>
    )
}
export default PlaylistCard