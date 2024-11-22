import React, { useState } from 'react';
import spotify_logo_svg from '../routes/spotify_logo_svg.svg';
import IconText from '../assets/shared/IconText';
import { Icon } from '@iconify/react';
import TextWithHover from '../assets/shared/TextWithHover';
import TextInput from '../assets/shared/TextInput';
import CloudinaryUpload from '../assets/shared/CloudinaryUpload';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';
import {useNavigate} from "react-router-dom";
import LoggedInContainer from "../container/LoggedInContainer"
const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState("");
  const navigate = useNavigate();
  
  const submitSong = async () => {
    const data = {name, thumbnail, track: playlistUrl};
    const response = await makeAuthenticatedPOSTRequest(
        "/song/create",
        data
    );
    if (response.err) {
        alert("Could not create song");
        return;
    }
    alert("Success");
    navigate("/home");
};
  return (
    <LoggedInContainer>
      <div className="text-2xl font-semibold mb-5 mt-20 text-white">
            Upload Your Music
          </div>
          <div className="w-2/3 flex space-x-3">
            <div className="w-1/2">
              <TextInput
                label="Name"
                placeholder="Enter Song Name"
                labelColor={"text-white"}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                label="Thumbnail"
                placeholder="Please add thumbnail"
                labelColor={"text-white"}
                value={thumbnail}
                setValue={setThumbnail}
              />
            </div>
          </div>
          <div className="bg-white rounded-full p-5 mt-5 w-1/5">
            {uploadedSongFileName ? (
              <div className="bg-white rounded-full p-3 w-1/3 font-semibold">
                {uploadedSongFileName.substring(0, 35)}...
              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setPlaylistUrl}
                setName={setUploadedSongFileName}
              />
            )}
          </div>
          <div className='bg-white w-40 flex items-center justify-center mt-10 rounded-full p-5 cursor-pointer font-semibold' onClick={submitSong}>
                Submit Song
          </div>
    </LoggedInContainer>
  );
}
export default UploadSong;
