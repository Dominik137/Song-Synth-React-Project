import React, { useState } from "react";


function PlaylistCard({data}){
console.log(data.items)
    
    return (
       <>
       <div>
        {data.items?.map((item)=>{
           return( <p>{item.name}</p>)
        })}
       </div>
       </>
    )
}
export default PlaylistCard