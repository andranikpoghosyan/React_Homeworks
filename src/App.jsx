import "./App.css";
import { useState } from "react";
import SongList from "./SongList";
import PlayList from "./PlayList";

function App() {
  const [songs, setSongs] = useState([
    {
      id: 101,
      title: "Առաջինը Արամն էր",
      artist: "Ասատրյաններ",
      duration: "3:58",
      url: "./src/songs/Arajiny Aramn Er.mp3",
    },
    {
      id: 102,
      title: "Առանց Սիրո",
      artist: "Կարեն",
      duration: "6:11",
      url: "./src/songs/Aranc Siro.mp3",
    },
    {
      id: 103,
      title: "Այս Գիշեր",
      artist: "Արմինկա",
      duration: "4:00",
      url: "./src/songs/Ays Gisher.mp3",
    },
    {
      id: 104,
      title: "Գոհար ես",
      artist: "Սարո",
      duration: "3:14",
      url: "./src/songs/Gohar Es.mp3",
    },
    {
      id: 105,
      title: "Մոխրացած հուշեր",
      artist: "Կարեն Դիանա",
      duration: "4:31",
      url: "./src/songs/Karen diana.mp3",
    },
    {
      id: 106,
      title: "Ժակո",
      artist: "Լադանիվա",
      duration: "2:45",
      url: "./src/songs/LADANIVA.mp3",
    },
    {
      id: 107,
      title: "Սեր ու կարոտ",
      artist: "Դիանա Կարեն",
      duration: "3:15",
      url: "./src/songs/Ser u Karot.mp3",
    },
    {
      id: 108,
      title: "Սիրելիս",
      artist: "Կարեն Երևի",
      duration: "4:23",
      url: "./src/songs/Sirelis.mp3",
    },
    {
      id: 109,
      title: "Սիրո արևներ",
      artist: "Արազ Դարե",
      duration: "3:39",
      url: "./src/songs/SIRO AREVNER.mp3",
    },
    {
      id: 110,
      title: "Վառել եմ մոմերս",
      artist: "Արա ՄԱրտիրոսյան",
      duration: "3:43",
      url: "./src/songs/Varel Em Momers.mp3",
    },
  ]);
  const [playList, setPlayList] = useState([]);

  const deleteSongFromPlayList = (id) => {
    setPlayList(playList.filter((x) => x.id !== id));
  };

  const removeSong = (id) => {
    setSongs(songs.filter((x) => x.id != id));
  };
  const addToPlayList = (id) => {
    if (!playList.some((song) => song.id == id)) {
      const currentSong = songs.find((x) => x.id == id);
      if (currentSong) {
        setPlayList([...playList, currentSong]);
      }
    }
  };

  const moveUp = (id) => {
    const index = playList.findIndex((song) => song.id === id);
    if (index > 0) {
      const newPlayList = [...playList];
      const temp = newPlayList[index];
      newPlayList[index] = newPlayList[index - 1];
      newPlayList[index - 1] = temp;
      setPlayList(newPlayList);
    }
  };

  const moveDown = (id) => {
    const index = playList.findIndex((song) => song.id === id);
    if (index < playList.length - 1) {
      const newPlayList = [...playList];
      const temp = newPlayList[index];
      newPlayList[index] = newPlayList[index + 1];
      newPlayList[index + 1] = temp;
      setPlayList(newPlayList);
    }
  };

  return (
    <div className="App">
      <div className="my_songs">
        <SongList
          items={songs}
          onDelete={removeSong}
          onAddToPlayList={addToPlayList}
          inPlaylist={false}
        />
      </div>
      <div className="playlist">
        <PlayList
          items={playList}
          onDelete={deleteSongFromPlayList}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
        />
      </div>
    </div>
  );
}

export default App;
