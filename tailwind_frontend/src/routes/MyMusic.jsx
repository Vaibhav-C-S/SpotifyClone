import React, { useState } from 'react';
import spotify_logo_svg from '../routes/spotify_logo_svg.svg';
import IconText from '../assets/shared/IconText';
import { Icon } from '@iconify/react';
import TextWithHover from '../assets/shared/TextWithHover';
import {makeAuthenticatedGETRequest} from "../utils/serverHelpers";
import SingleSongCard from '../assets/shared/SingleSongCard';
import { useEffect } from "react";
import {Howl,Howler} from 'howler'
import LoggedInContainer from '../container/LoggedInContainer'
// const MyMusic= () => {
//     const [songData, setSongData] = useState([]);
//     const [soundPlayed, setSoundPlayed] = useState(null);

//     const playSound = (songSrc) => {
//         // Stop the currently playing sound, if any
//         if (soundPlayed) {
//           soundPlayed.stop();
          
//         }
      
//         // Create a new Howl instance for the new song
//         let sound = new Howl({
//           src: [songSrc],
//           html5: true, // Ensures the use of HTML5 Audio
//         });
      
//         // Set the new sound as the currently playing sound
//         setSoundPlayed(sound);
        
//         // Play the sound
//         sound.play();
//       };

//     useEffect(() => {
//         const getData = async () => {
//             const response = await makeAuthenticatedGETRequest(
//                 "/song/get/mysongs"
//             );
//             setSongData(response.data);
//             console.log(response)
//         };
//         getData();
//     }, []);

//   return (
//     <div className="w-full h-full flex">
//       {/* Left Panel */}
//       <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
//         <div>
//           <div className="logoDiv p-6">
//             <img src={spotify_logo_svg} alt="spotify logo" width="125" />
//           </div>
//           <div className="py-5">
//             <IconText iconName="material-symbols:home" displayText="Home" active />
//             <IconText iconName="material-symbols:search-rounded" displayText="Search" />
//             <IconText iconName="icomoon-free:books" displayText="Your Library" />
//             <IconText iconName="material-symbols:library-music-sharp" displayText="My Music" />
//           </div>
//           <div className="pt-5">
//             <IconText iconName="material-symbols:add-box" displayText="Create Playlist" />
//             <IconText iconName="mdi:cards-heart" displayText="Liked Songs" />
//           </div>
//         </div>
//         <div className="px-5">
//           <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
//             <Icon icon="carbon:earth-europe-africa" />
//             <div className="ml-2">English</div>
//           </div>
//         </div>
//       </div>

//       {/* Main Panel */}
//       <div className="h-full w-4/5 bg-app-black overflow-auto">
//         {/* Navbar */}
//         <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end fixed top-0 right-0 z-10">
//           <div className="w-1/2 flex h-full">
//             <div className="w-2/3 flex justify-around items-center">
//               <TextWithHover displayText="Premium" />
//               <TextWithHover displayText="Support" />
//               <TextWithHover displayText="Download" />
//               <div className="h-1/2 border-r border-white"></div>
//             </div>
//             <div className="w-1/3 flex justify-around h-full items-center">
//               <TextWithHover displayText="Upload Song" />
//               <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
//                 CV
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="content p-8 pt-0 overflow-auto w-full">
//         <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
//                 My Songs
//             </div>
//             <div className="space-y-3 overflow-auto">
//                 {songData.map((item) => {
//                     return <SingleSongCard info={item} playSound={playSound} />;
//                 })}
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };


const MyMusic = () => {
    const [songData, setSongData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/song/get/mysongs"
            );
            setSongData(response.data);
            console.log(response)
        };
        getData();
    }, []);
    
  return (
    <LoggedInContainer>
        <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
        
                My Songs
        </div>
        <div className="space-y-3 overflow-auto">
                {songData.map((item) => {
                    return <SingleSongCard info={item} key={item.id} playSound={()=>{}} />;
                })}
        </div>
        
        
    </LoggedInContainer>
  )
}

export default MyMusic

