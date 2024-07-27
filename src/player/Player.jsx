
import "../css/player.css"
import React, { useRef } from 'react';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsSkipEndCircleFill, BsFillSkipEndCircleFill} from 'react-icons/bs';

const Player = ({audioElem, isplaying, setisplaying, currentSong, setCurrentSong, songs})=> {

    const clickRef = useRef();

    const PlayPause = ()=>
    {
      setisplaying(!isplaying);
  
    }

 

    const checkWidth = (e)=>
        {
          let width = clickRef.current.clientWidth;
          const offset = e.nativeEvent.offsetX;
      
          const divprogress = offset / width * 100;
          audioElem.current.currentTime = divprogress / 100 * currentSong.length;
      
        }
      
        const skipBack = ()=>
        {
          const index = songs.findIndex(x=>x.title == currentSong.title);
          if (index == 0)
          {
            setCurrentSong(songs[songs.length - 1])
          }
          else
          {
            setCurrentSong(songs[index - 1])
          }
          audioElem.current.currentTime = 0;
          
        }
      
      
        const skiptoNext = ()=>
        {
          const index = songs.findIndex(x=>x.title == currentSong.title);
      
          if (index == songs.length-1)
          {
            setCurrentSong(songs[0])
          }
          else
          {
            setCurrentSong(songs[index + 1])
          }
          audioElem.current.currentTime = 0;
          
        }
        
        const formatTime = (time) => {
            if (isNaN(time)) return "00:00";
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
        return (
            <div className='player_container'>
                <div className={`player-img ${isplaying ? 'playing' : ''}`}>
            <img src={currentSong.img} class="active" id="cover"/>
            </div>
              <div className="title">
                <p>{currentSong.title}</p>
               
              </div>
              <div className="time">
               <span>{formatTime(audioElem.current?.duration - audioElem.current?.currentTime)}</span>
            </div>
              <div className="navigation">
                <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
                  <div className="seek_bar" style={{width: `${currentSong.progress+"%"}`}}></div>
                </div>
              </div>
              <div className="controls">
                <BsFillSkipStartCircleFill className='btn_action' onClick={skipBack}/>
                {isplaying ? <BsFillPauseCircleFill className='btn_action pp' onClick={PlayPause}/> : <BsFillPlayCircleFill className='btn_action pp' onClick={PlayPause}/>}
                <BsFillSkipEndCircleFill className='btn_action' onClick={skiptoNext}/>        
              </div>
            </div>
          
          )

}

export default Player;