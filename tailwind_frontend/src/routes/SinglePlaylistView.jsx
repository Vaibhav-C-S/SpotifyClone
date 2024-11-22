import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import SingleSongCard from '../assets/shared/SingleSongCard';
import LoggedInContainer from '../container/LoggedInContainer'
const SinglePlaylistView = () => {
    const [playlistDetails,setPlaylistDetails] = useState({})
    const {playlistId} = useParams();
    useEffect(()=>{
        const getData = async()=>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/playlist/"+ playlistId)
            setPlaylistDetails(response)
        }
        getData()
    },[])
  return (
    <LoggedInContainer>
        {playlistDetails._id && <div>
            <div className='text-white font-semibold text-xl pt-8 mt-20 mb-3'>
            {playlistDetails.name}
        </div>
        <div className="pt-10 space-y-3">
                        <div className="text-white">
                            {playlistDetails.name}
                        </div>
                        {playlistDetails.songs.map((item) => {
                            return (
                                <SingleSongCard
                                    info={item}
                                    key={JSON.stringify(item)}
                                    playSound={() => {}}
                                />
                            );
                        })}
            </div>

        </div>
        
}

    </LoggedInContainer>
  )
}

export default SinglePlaylistView