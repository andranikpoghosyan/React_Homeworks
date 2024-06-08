import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [photos, setPhotos] = useState([
    {
      id: 101,
      url: "https://wallpapers.com/images/featured/prague-l8aujv2epf7ojy0r.jpg",
    },
    { id: 102, url: "https://images8.alphacoders.com/374/374028.jpg" },
    {
      id: 103,
      url: "https://images7.alphacoders.com/487/thumb-1920-487159.jpg",
    },
    {
      id: 104,
      url:
        "https://wallpapers.com/images/hd/prague-church-at-dawn-500ebpx4fnhzqxni.jpg",
    },
    {
      id: 105,
      url:
        "https://wallpapers.com/images/hd/prague-churches-and-spires-kr2ll9pmha86r9tt.jpg",
    },
    {
      id: 106,
      url:
        "https://c4.wallpaperflare.com/wallpaper/150/315/757/prague-czechia-czech-republic-europe-wallpaper-preview.jpg",
    },
    { id: 107, url: "https://wallpapers-hub.art/wallpaper-images/41279.jpg" },
    { id: 108, url: "https://wallpaper.dog/large/20388524.jpg" },
  ]);
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < photos.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  // Next/Prev քլիկի ժամանակ համապատասխանաբար ակտիվացնել հաջորդ կամ նախորդ նկարները: Եթե Next անելիս այևս նոր նկար չկա, ապա սկսել 0-ից, prev-ի դեպքում հակառակը՝ վերջից:

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(photos.length - 1);
    }
  };

  // #timeline-ում ցուցադրված փոքր նկարների քլիկի ժամանակ տվյալ նկարը դարձնել հիմնական նկար:

  const setAsGeneralPicture = (id) => {
    let currentIndex = photos.findIndex((elem) => {
      return elem.id == id;
    });
    setIndex(currentIndex);
  };

  return (
    <div className="App">
      <div className="container">
        <img src={photos[index].url} id="main" alt="" />
        <div>
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
        <div id="timeline">
          {photos.map((elem, i) => {
            let style = i == index ? "active" : "";

            return (
              <img
                key={elem.id}
                className={style}
                src={elem.url}
                onClick={(id) => setAsGeneralPicture(elem.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
