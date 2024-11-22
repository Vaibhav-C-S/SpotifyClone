import React, { useContext, useEffect, useRef, useLayoutEffect, useState } from 'react';
import spotify_logo_svg from '../routes/spotify_logo_svg.svg';
import IconText from '../assets/shared/IconText';
import { Icon } from '@iconify/react';
import TextWithHover from '../assets/shared/TextWithHover';
import { Howl } from 'howler';
import SongContext from '../contexts/SongContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CreatePlaylistModal from '../modals/CreatePlaylistModal';
import Library from '../routes/Library';
import AddToPlaylistModal from '../modals/AddToPlaylistModal';
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';

const LoggedInHomeContainer = ({ children }) => {
    const {
        currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
    } = useContext(SongContext);

    const firstUpdate = useRef(true);
    const navigate = useNavigate();
    const [CreatePlaylistModalOpen,setPlaylistModalOpen] = useState(false)
    const [AddToPlaylistModalOpen,setAddtoPlaylistOpen]= useState(false)
    useLayoutEffect(() => {
        // the following if statement will prevent the useEffect from running on the first render.
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currentSong) {
            return;
        }
        changeSong(currentSong.track);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSong && currentSong.track]);

    
    const addSongToPlaylist = async(playlistId) =>{
        const songId = currentSong._id;
        const payload = {playlistId,songId}
        
        const response = await makeAuthenticatedPOSTRequest("/playlist/add/song",payload)
        
        if(response._id){
            setAddtoPlaylistOpen(false);
        }
    }
    const playSound = () => {
        if (!soundPlayed) {
            return;
        }
        soundPlayed.play();
    };

    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            pauseSound();
            setIsPaused(true);
        }
    };

    return (
        <div className="w-full h-full bg-app-black">
            {CreatePlaylistModalOpen && <CreatePlaylistModal closeModal = {()=>setPlaylistModalOpen(false)}/>}
            {AddToPlaylistModalOpen && <AddToPlaylistModal closeModal={()=>setAddtoPlaylistOpen(false)} addSongToPlaylist={addSongToPlaylist}></AddToPlaylistModal>}
            <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
                {/* Left panel */}
                <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                    <div>
                        <div className="logoDiv p-6">
                            <img src={spotify_logo_svg} alt="spotify logo" width="125" />
                        </div>
                        <div className="py-5">
                            <IconText iconName="material-symbols:home" displayText="Home" active targetLink={"/home"} />
                            <IconText iconName="material-symbols:search-rounded" displayText="Search" />
                            <IconText iconName="icomoon-free:books" displayText="Your Library" targetLink={"/library"} />
                            <IconText iconName="material-symbols:library-music-sharp" displayText="My music" targetLink={"/MyMusic"} />
                        </div>
                        <div className="pt-5">
                            <IconText iconName="material-symbols:add-box" displayText="Create Playlist" onClick = {()=>setPlaylistModalOpen(true)}/>
                            <IconText iconName="mdi:cards-heart" displayText="Liked Songs" />
                        </div>
                    </div>
                    {/* Language selection */}
                    <div className="px-5">
                        <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                            <Icon icon="carbon:earth-europe-africa" />
                            <div className="ml-2">English</div>
                        </div>
                    </div>
                </div>
                {/* Main content */}
                <div className="h-full w-4/5 bg-app-black overflow-auto">
                    <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end fixed top-0 right-0 z-10">
                        <div className="w-1/2 flex h-full">
                            <div className="w-2/3 flex justify-around items-center">
                                <TextWithHover displayText="Premium" />
                                <TextWithHover displayText="Support" />
                                <TextWithHover displayText="Download" />
                                <div className="h-1/2 border-r border-white"></div>
                            </div>
                            <div className="w-1/3 flex justify-around h-full items-center">
                                <TextWithHover displayText="Upload Song" onClick={() => {navigate("/uploadsong");console.log("hello")}}/>
                                <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                    CV
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content p-8 pt-0 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
            {currentSong &&
                <div className='w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4'>
                    <div className='w-1/4 flex items-center'>
                        <img src={currentSong.thumbnail} alt=""
                            className='w-14 h-14 rounded' />
                        <div className='pl-4'>
                            <div className='text-sm hover:underline cursor-pointer'>{currentSong.name}</div>
                            <div className='text-xs text-gray-50 hover:underline cursor-pointer'>{currentSong.artist.firstName + " " + currentSong.artist.lastName}</div>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-center h-full flex-col items-center">
                        <div className='flex w-1/2 justify-between items-center'>
                            <Icon
                                icon="ph:shuffle-fill"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="mdi:skip-previous-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon={
                                    isPaused
                                        ? "ic:baseline-play-circle"
                                        : "ic:baseline-pause-circle"
                                }
                                fontSize={50}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={togglePlayPause}
                            />
                            <Icon
                                icon="mdi:skip-next-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="ic:twotone-repeat"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                        </div>
                    </div>
                    <div className="w-1/4 flex justify-end pr-4 space-x-4">
                    <Icon icon="ic:round-playlist-add" fontSize={25}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={()=>{setAddtoPlaylistOpen(true)}}/>
                    <Icon icon="ph:heart-bold" fontSize={25}
                                className="cursor-pointer text-gray-500 hover:text-white"/>
                    </div>
                </div>
            }
        </div>
    );
};

export default LoggedInHomeContainer;
