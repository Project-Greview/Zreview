// MODULE
import { useEffect, useState, useRef } from "react";
// PROPS TYPE
type ProfileImageProps = {
  src: string;
  alt: string;
  size: number;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt, size }) => {
  const imgRef = useRef(null);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);

  // useEffect(() => {
  //   const onLoadImage = () => {
  //     const img = imgRef?.current;
  //     const width = img?.naturalWidth;
  //     const height = img?.naturalHeight;

  //     setImgWidth(width);
  //     setImgHeight(height);

  //     const ratio = width / height;

  //     if (ratio > 1) {
  //       const newWidth = size * ratio;
  //       const newHeight = size;
  //       img.style.width = `${newWidth}px`;
  //       img.style.height = `${newHeight}px`;
  //     } else {
  //       const newWidth = size;
  //       const newHeight = size * ratio;
  //       img.style.width = `${newWidth}px`;
  //       img.style.height = `${newHeight}px`;
  //     }
  //   };
  //   imgRef.current.addEventListener("load", onLoadImage);
  // }, [src, size]);
  return (
    <div>
      <img ref={imgRef} src={src} alt={alt} />
    </div>
  );
};

export default ProfileImage;
