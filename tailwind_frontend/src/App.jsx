import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import LoginComponent from './routes/LoginComponent';
import SignUpComponent from './routes/SignUpComponent';
import HomeComponent from './routes/HomeComponent';
import LoggedInHomeComponent from './routes/LoggedInHomeComponent';
import UploadSong from './routes/UploadSong';
import MyMusic from './routes/MyMusic';
import SongContext from './contexts/SongContext';
import SearchPage from './routes/SearchPage';
import Library from './routes/Library';
import SinglePlaylistView from './routes/SinglePlaylistView';

function App() {
  const [cookies] = useCookies(['token']); // Renamed to cookies for clarity
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null); // Define soundPlayed state
  const [isPaused, setIsPaused] = useState(true);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookies.token ? (
          <SongContext.Provider value={{ currentSong, setCurrentSong,setIsPaused,setSoundPlayed,isPaused,soundPlayed }}>
            <Routes>
              {/* Routes for authenticated users */}
              <Route path="/home" element={<LoggedInHomeComponent />} />
              <Route path="/uploadsong" element={<UploadSong />} />
              <Route path="/myMusic" element={<MyMusic />} />
              <Route path='/search' element = {<SearchPage/>}/>
              <Route path='/library' element = {<Library/>}/>
              <Route path="/playlist/:playlistId" element={<SinglePlaylistView/>}/>
              <Route path="*" element={<Navigate to="/home" replace />} />

            </Routes>
          </SongContext.Provider>
        ) : (
          <Routes>
            {/* Routes for unauthenticated users */}
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignUpComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
