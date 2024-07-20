"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export const ImagePicker = () => {
  const img = useRef<HTMLInputElement>(null);

  const [url, setUrl] = useState<string>("");

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    let file = img.current?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setUrl(reader.result as string);
      };
    }
  };

  return (
    <>
      <input
        type="file"
        className="input is-primary is-hidden"
        ref={img}
        name="cover"
        onChange={handleChange}
      />

      <button
        onClick={() => img.current?.click()}
        type="button"
        className="button is-light"
      >
        Picture
      </button>
      {url && (
        <div className="img_box">
          <Image src={url} width={150} height={150} alt="lecturers photo" />
        </div>
      )}
    </>
  );
};
