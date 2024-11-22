import React from 'react'
import { useEffect,useState } from 'react'
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers'
const AddToPlaylistModal = ({closeModal,addSongToPlaylist}) => {
    const [Playlists,setPlaylists] = useState([])
    useEffect (()=>{
        const getData = async ()=>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/me");
            
            setPlaylists(response.data)
        }
        getData();
    },[])
  return (
    <div className='absolute  bg-black opacity-70 w-screen h-screen z-20 flex justify-center items-center' onClick={closeModal}>
        <div className='bg-app-black w-1/3 rounded p-6 space-y-5    ' onClick={(e)=>e.stopPropagation()}>
            <div className='font-semibold text-white '>
                Create Playlist
            </div>
            <div className='space-y-4 flex flex-col justify-center items-center'>
                {
                    Playlists.map((item)=>{
                        return <PlaylistComponent info={item} addSongToPlaylist ={addSongToPlaylist}/>
                    })
                }
            </div>
        </div>
    </div>
  )
}
const PlaylistComponent = ({info,addSongToPlaylist})=>{
    return (
        <div className='bg-app-black w-full flex items-center space-x-4 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer p-3' onClick={()=>addSongToPlaylist(info._id)}>
            <div>
                <img src={info.thumbnail} className='w-10 h-10 rounded'/>
            </div>
            <div className='text-white font-semibold text-sm '>
                {info.name}
            </div>
        </div>
    )
}

export default AddToPlaylistModal