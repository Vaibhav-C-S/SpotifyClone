import React, { useState } from 'react'
import TextInput from '../assets/shared/TextInput'
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelpers'
const CreatePlaylistModal = ({closeModal}) => {
    const [playlistName,setPlaylistName] = useState("")
    const [playlistThumbnail,setPlaylistThumbnail] = useState("")
    const createPlaylist = async() =>{
        const response =  await makeAuthenticatedPOSTRequest("/playlist/create",{name:playlistName, thumbnail:playlistThumbnail,songs:[]})
        console.log(response)
        if(response._id){
            closeModal();
        }
    }
  return (
    <div className='absolute  bg-black opacity-70 w-screen h-screen z-20 flex justify-center items-center' onClick={closeModal}>
        <div className='bg-app-black w-1/3 rounded p-6 space-y-5    ' onClick={(e)=>e.stopPropagation()}>
            <div className='font-semibold text-white '>
                Create Playlist
            </div>
            <div className=''>
            <TextInput
                label="Name"
                placeholder="Please add name"
                
                labelColor={"text-white"}
                value={playlistName}
                setValue={setPlaylistName}
                
              />
              <TextInput
                label="Thumbnail"
                placeholder="Please add thumbnail"
                
                labelColor={"text-white"}
                value={playlistThumbnail}
                setValue={setPlaylistThumbnail}
              />
              <div className='flex justify-center items-center'>

              <button className='bg-white rounded-full w-1/3 p-4 mt-3' onClick={createPlaylist}>
                    Create Playlist
              </button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default CreatePlaylistModal