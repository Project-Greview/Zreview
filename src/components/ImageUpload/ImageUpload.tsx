// MODULE
import { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import Resizer from "react-image-file-resizer";
// RECOIL STATE
import { resizeUploadImageState, originUploadState } from "state/writeState";
// SVG
import { ReactComponent as CameraIcon } from "../../assets/image/icon/camera_icon.svg";
// PROPS TYPE
interface FileInputChangeEvent {
  target: {
    files: FileList;
  };
}
const ImageUpload: React.FC = () => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [resizeImg, setResizeImg] = useRecoilState<any>(resizeUploadImageState);
  const [uploadImage, setUploadImage] = useRecoilState<any>(originUploadState);

  // IMAGE RESIZE
  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1200,
        1200,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
  const handleAddImages = async (e: FileInputChangeEvent) => {
    const imageLists = e.target.files;
    const resizedImages = [];

    const imageUrlLists = [...resizeImg];

    for (let i = 0; i < imageLists.length; i++) {
      const file = imageLists[i];
      const image = await resizeFile(file);
      resizedImages.push(image);
    }

    let newImageList = [
      ...uploadImage,
      ...resizedImages.slice(0, 5 - uploadImage.length),
    ];
    let newImageThumbList = newImageList.map((image) =>
      image instanceof File ? URL.createObjectURL(image) : image
    );

    if (resizedImages.length > 2) {
      alert("이미지는 최대 2장 까지만 등록이 가능합니다.");
      setResizeImg(newImageList.slice(0, 2));
      setUploadImage(newImageThumbList);
    } else {
      setResizeImg(newImageList);
      setUploadImage(newImageThumbList);
    }
  };
  return (
    <div>
      <input
        id="image_file_upload"
        type="file"
        accept="image/*"
        ref={imgRef}
        multiple
        onChange={(e) => handleAddImages(e as FileInputChangeEvent)}
      />
      <label
        htmlFor="image_file_upload"
        className="relative flex flex_dir_c flex_jc_c flex_ai_c"
      >
        <CameraIcon />
        <div className="txt ">사진 ({resizeImg.length}/2)</div>
      </label>
    </div>
  );
};

export default ImageUpload;
