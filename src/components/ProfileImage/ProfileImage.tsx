// MODULE
import { useEffect, useState, useRef } from "react";
// PROPS TYPE
type ProfileImageProps = {
  src: string;
  alt: string;
  size: number;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt, size }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const onLoadImage = () => {
      const img = imgRef?.current;
      if (!img) return;

      const width = img?.naturalWidth;
      const height = img?.naturalHeight;
      const ratio = width / height;

      if (ratio > 1) {
        const newWidth = size;
        const newHeight = size / ratio;
        img.style.width = `${newWidth}px`;
        img.style.height = `${newHeight}px`;
      } else {
        const newHeight = size;
        const newWidth = size * ratio;
        img.style.width = `${newWidth}px`;
        img.style.height = `${newHeight}px`;
      }
    };

    if (imgRef.current) {
      imgRef.current.addEventListener("load", onLoadImage);

      return () => {
        if (imgRef.current) {
          imgRef.current.removeEventListener("load", onLoadImage);
        }
      };
    }
  }, [src, size]);
  return (
    <div
      className="img_box"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <img ref={imgRef} src={src} alt={alt} />
    </div>
  );
};

export default ProfileImage;
