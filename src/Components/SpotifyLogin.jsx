import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SpotifyGetPlaylists from './SpotifyGetPlaylists'
import SpotifyUser from "./SpotifyUser";
import ArtistAlbumCards from "./ArtistAlbulmCards"


function SpotifyLogin(){

    const clientId = "152fa3e8d8494849a4638589b450eb32"
    const redirectURI = "http://localhost:5173/"
    const authEndpoint = "https://accounts.spotify.com/authorize"
    const respType = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    const [peps, setPeps] = useState("")
    const [id, setId] = useState('')
    


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
            },
            
        })
        
       
            
        // setPeps(artistMap)
        setArtists(data.artists.items)
    }   
    const artistMap =  artists.map(artist => (
    <>
    <div className="artist-grid-container">
    <div 
    onClick={()=>{   
            {id ? setId("") : setId(artist.id)}
           
    }}
    className="card" key={artist.id}>
        {artist.images.length ? <img className="artistImage"
        onClick={(e)=>{{e.stopPropagation()}window.open(`${artist.external_urls.spotify}`)}}
         width={"100px"} height={"100px"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
        <h1>{artist.name}</h1>
        <h2 className="">Followers: {artist.followers.total.toLocaleString()}</h2>
        <button onClick={(e)=>{
            e.stopPropagation()
            fetch('http://localhost:3000/savedArtists',{
                method:"POST",
                 headers:{ 'Content-Type': 'application/json'
                 },
                body: JSON.stringify({
                    "name": artist.name,
                    "image": artist.images[0],
                    "followers": artist.followers.total,
                    "artistLink": artist['external_urls'].spotify
                })
                 })
                 
            }} className="saveButton">Save</button>
    </div>
    {id === artist.id  ? <ArtistAlbumCards id={id}/> : <></>}
    </div>
    </>
))
    return(
        <>

       
        <div className="">{!token ?
            <button className="logInButton">
                <a className="anchor"
           href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${respType}`}>Login to Spotify</a>
            </button>
            : <button className="logOutButton"
            onClick={logout}>Logout</button>}
            </div>
   
          
        <div className="container">
          
          
          <div className="column">
            {token ? <SpotifyUser /> : ""}

          </div>
        
                
                
        <div className="middleColumn">
            {token ?
                <form className="" onSubmit={searchArtists}> 
                    <h1 className="searchArtisth1">Search Artists!</h1>
                        <input className="artistSearch" placeholder=":)" type="text" onChange={e => setSearchKey(e.target.value)}/>
                            <button className="searchButton"  type={"submit"} >Search
                            </button>
                </form>
                        : <h2 ></h2>
                }
                
                 <div className="middleColumn">
                 <div name="father">{artistMap}</div>
                </div>
                <div name="blah"></div>



        </div>
        <div className="column">
               {token ? <SpotifyGetPlaylists /> : ""}
        </div>
        </div>
        </>
    )
}
 
export default SpotifyLogin