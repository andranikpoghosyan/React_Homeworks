import React from "react";
import Song from "./Song";

export default function SongList({
  items,
  onDelete,
  onAddToPlayList,
  inPlaylist,
}) {
  return (
    <div className="SongList">
      <h1>Song List</h1>

      {items.map((elem) => (
        <Song
          key={elem.id}
          {...elem}
          onDelete={onDelete}
          onAddToPlayList={onAddToPlayList}
          inPlaylist={inPlaylist}
        />
      ))}
    </div>
  );
}
