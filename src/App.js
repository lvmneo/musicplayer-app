
import './App.css';
import Player from './player/Player';
import { songsdata } from './player/audio';
import { useRef, useState, useEffect } from 'react';

const App = () => {
  const [songs, setSongs] = useState(songsdata);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[0]);
  const [currentTime, setCurrentTime] = useState(0);

  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    }
    else {
      audioElem.current.pause();
    }
  }, [isplaying, currentSong])

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    setCurrentTime(ct);
    setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })

  }
 

  return (
    <div className="App">
      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} />
      <Player 
      songs={songs} 
      setSongs={setSongs} 
      isplaying={isplaying} 
      setisplaying={setisplaying} 
      audioElem={audioElem} 
      currentSong={currentSong} 
      setCurrentSong={setCurrentSong}
       />
    </div>
  );
  
  

}



export default App;
