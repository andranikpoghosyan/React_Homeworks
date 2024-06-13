import React, { useState } from "react";
import Song from "./Song";

export default function PlayList({ items, onDelete, onMoveUp, onMoveDown }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSongMoveUp = (id) => {
    onMoveUp(id);
  };

  const handleSongMoveDown = (id) => {
    onMoveDown(id);
  };

  const handlePlaySong = (url) => {
    const audio = new Audio(url);

    if (currentSong !== audio) {
      if (currentSong) {
        currentSong.pause();
      }
      setCurrentSong(audio);
      setIsPlaying(true);
      audio.play();
    } else {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }

    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  const handlePauseSong = () => {
    if (currentSong && isPlaying) {
      currentSong.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="Playlist">
      <h1>Playlist</h1>
      <h1>Number of songs: {items.length}</h1>
      {items.map((elem, index) => (
        <div key={elem.id} className="playlist-song">
          <Song
            {...elem}
            inPlaylist={true}
            onDelete={onDelete}
            onMoveUp={handleSongMoveUp}
            onMoveDown={handleSongMoveDown}
            isFirstSong={index === 0}
            isLastSong={index === items.length - 1}
          />
          <div className="song_controls">
            <button
              className="play_button"
              onClick={() => handlePlaySong(elem.url)}
            >
              <img src="./src/icons/play.png" alt="play" />
            </button>
            <button className="pause_button" onClick={handlePauseSong}>
              <img src="./src/icons/pause.png" alt="pause" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
