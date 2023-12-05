import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from './ArtistCard'


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
                <div key={artist.id}>
                    {artist.images.length ? <img width={"100px"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                    {artist.name}
                </div>
            ))
            setPeps(artistMap)
            setArtists(data.artists.items)
        }       
    return(
        <div className="font-body flex flex-col items-center ">
           <header className="">
           {!token ?
            <button className="font-body text-3xl relative top-12
            bg-transparent hover:bg-green-600 hover:text-black py-2 px-4 border border-black hover:border-transparent "  >
                <a
           href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${respType}`}>Login to Spotify</a>
            </button>
            : <button className="font-body text-3xl absolute top-0 right-0
            bg-transparent hover:bg-green-600 hover:text-black py-2 px-4 border border-black hover:border-transparent "
            onClick={logout}>Logout</button>}

                {token ?
                    <form className=" text-center relative top-12 pb-4 " onSubmit={searchArtists}> 
                    <h1 className="font-body text-3xl ">Search Artists!</h1>
                        <input className="border border-black bg-white focus:outline-none relative left-10" type="text" onChange={e => setSearchKey(e.target.value)}/>
                        <button className="font-body text-xs relative top-0 left-12
            bg-transparent hover:bg-green-600 hover:text-black py-2 px-4 border border-black hover:border-transparent"  type={"submit"} >Search
                        </button>
                    </form>

                    : <h2 ></h2>
                }

               <div className="flex flex-col items-center relative top-10 mt-12"><ArtistCard peps={peps} /></div>
                
        
            </header>
        </div>
    )
}
 
export default SpotifyLogin