import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SpotifyGetPlaylists from './SpotifyGetPlaylists'


function SpotifyLogin(){

    const clientId = "152fa3e8d8494849a4638589b450eb32"
    const redirectURI = "http://localhost:5173/"
    const authEndpoint = "https://accounts.spotify.com/authorize"
    const respType = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
   const [peps, setPeps] = useState("")

    useEffect(()=>{
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elm => elm.startsWith('access_token')).split('=')[1]
        
            window.location.hash = ""
            window.localStorage.setItem('token', token)
            
        }
        setToken(token)
        //This token gets saved to local storage in browser, might be able to pass that value to different components so you stay logged in no matter
        //what route you go to
    },[])
       
    
        const logout = () => {
            setToken('')
            window.localStorage.removeItem("token")
            setPeps([])
        }

        const searchArtists = async (e) => {
            e.preventDefault()
            const {data} = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: searchKey,
                    type: "artist"
                }
            })
            
         
            
                const artistMap =  data.artists.items.map(artist => (
                <>
                <div></div>
                <div key={artist.id}>
                    {artist.images.length ? <img width={"100px"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                    <h1>{artist.name}</h1>
                    <h2 className="font-body mb-4">Followers: {artist.followers.total.toLocaleString()}</h2>
                    {console.log(artist)}
                    <button onClick={()=>{
                        fetch('http://localhost:3000/savedArtists',{
                            method:"POST",
                             headers:{ 'Content-Type': 'application/json'
                             },
                            body: JSON.stringify({
                                "name": artist.name,
                                "image": artist.images[0],
                                "followers": artist.followers.total
                            })
                             })
                             
                        }} className="saveButton">Save</button>
                </div>
                </>
            ))
            setPeps(artistMap)
            setArtists(data.artists.items)
        }   
        
    return(
        <>
          <div className="header">
           <div className="logoutLogin">{!token ?
            <button className="button"  >
                <a className="anchor"
           href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${respType}`}>Login to Spotify</a>
            </button>
            : <button className="button"
            onClick={logout}>Logout</button>}
            </div>
          </div>
        <div className='container'>
                <div>
                {token ?
                    <form className="" onSubmit={searchArtists}> 
                    <h1 className="">Search Artists!</h1>
                        <input className="artistSearch" type="text" onChange={e => setSearchKey(e.target.value)}/>
                        <button className="searchButton"  type={"submit"} >Search
                        </button>
                    </form>

                    : <h2 ></h2>
                }
                    </div>
               <div name="Searched">{peps}</div>
               {token ? <SpotifyGetPlaylists /> : ""}
        
        </div>
        </>
    )
}
 
export default SpotifyLogin