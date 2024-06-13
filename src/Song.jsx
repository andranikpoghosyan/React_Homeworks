import React from "react";

export default function Song({
  title,
  artist,
  duration,
  id,
  onDelete,
  onAddToPlayList,
  inPlaylist,
  onMoveUp,
  onMoveDown,
  isFirstSong,
  isLastSong,
}) {
  const handleMoveUp = () => {
    onMoveUp(id);
  };

  const handleMoveDown = () => {
    onMoveDown(id);
  };

  return (
    <div className="Song">
      <h2>
        Song Title: <span>{title}</span>
      </h2>

      <h2>
        Artist <span>{artist}</span>
      </h2>

      <h2>
        Duration: <span>{duration}</span>
        <small>min</small>
      </h2>

      <div className="buttons_section">
        <button onClick={() => onDelete(id)}>Delete Song</button>
        {!inPlaylist && (
          <button onClick={() => onAddToPlayList(id)}>Move To Playlist</button>
        )}
        {inPlaylist && <button onClick={handleMoveDown}>Move Down</button>}
        {inPlaylist && <button onClick={handleMoveUp}>Move Up</button>}
      </div>
    </div>
  );
}
