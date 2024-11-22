import React, { useEffect, useState } from "react";
import LoggedInContainer from "../container/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const [myPlaylists, setPlaylists] = useState([]); // Initialize state as an empty array

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/playlist/get/me");
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    getData();
  }, []);

  return (
    <LoggedInContainer>
      <div className="text-white font-semibold text-xl pt-8 mt-20 mb-3">
        My Playlists
      </div>
      <div className="py-5 grid gap-4 grid-cols-5">
        {myPlaylists.map((item) => (
          <Card
            key={item._id}
            title={item.name}
            description=""
            imgUrl={item.thumbnail}
            playlistId={item._id}
          />
        ))}
      </div>
    </LoggedInContainer>
  );
};

const Card = ({ title, description, imgUrl, playlistId }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-black bg-opacity-40 w-full p-4 mt-2 rounded-lg cursor-pointer"
      onClick={() => navigate("/playlist/" + playlistId)}
    >
      <div className="pb-4 pt-2">
        <img
          className="w-full h-40 object-cover rounded-md"
          src={imgUrl || "default-thumbnail.jpg"} // Provide a fallback image
          alt={title || "Playlist"}
        />
      </div>
      <div className="text-white font-semibold py-3">{title || "Untitled"}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default Library;
