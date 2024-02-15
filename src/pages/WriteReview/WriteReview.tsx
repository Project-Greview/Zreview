// MODULE
import { useState, ChangeEvent, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import Resizer from "react-image-file-resizer";
// RECOIL STATE
import { toastPopupState } from "state/commonState";
import { locationSearchResultState } from "state/searchState";
import {
  reviewLocationInfoState,
  reviewSearchResultState,
} from "state/writeState";
// COMPONENT
import ToastPopup from "components/ToastPopup";
import Input from "../../components/Common/Input";
import StarScore from "./ScoreStar";
import Button from "components/Common/Button";
import HashTag from "components/HashTag";
import Modal from "components/Modal";
// SVG
import { ReactComponent as SearchIcon } from "../../assets/image/icon/keyword_search.svg";
import { ReactComponent as LogoIcon } from "../../assets/image/icon/marker_c.svg";
import { InputFiles } from "typescript";
// PROPS TYPE
interface FileInputChangeEvent {
  target: {
    files: FileList;
  };
}
type WriteReviewProps = {};

const WriteReview: React.FC<WriteReviewProps> = () => {
  const imgRef = useRef<HTMLInputElement | null>(null);

  const [toastModal, setToastModal] = useRecoilState<boolean>(toastPopupState);
  const [locationType, setLocationType] = useState<"search" | "write">(
    "search"
  );
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [writeLocation, setWriteLocation] = useState<string>("");
  const [contents, setContents] = useState("");
  const [writeHashTag, setWriteHashTag] = useState<string>("");
  const [hashtag, setHashtag] = useState<any>([]);
  const [alarmModal, setAlarmModal] = useState<number>(0);
  const [resizeImg, setResizeImg] = useState<any>([]);
  const [uploadImage, setUploadImage] = useState<any>([]);

  let maxHashtag = hashtag.length === 3;
  const settingType = locationType === "search";
  const locationInfo = useRecoilValue(reviewLocationInfoState);
  const resetLocationInfo = useResetRecoilState(reviewLocationInfoState);
  const resetLocationData = useResetRecoilState(reviewSearchResultState);

  console.log(uploadImage);
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

  const handleOpenToastPopup = () => {
    setToastModal(true);
  };
  const handleAddWriteHashtag = () => {
    if (!maxHashtag) {
      setHashtag((prevTag: any) => [...prevTag, writeHashTag]);
      setWriteHashTag("");
    }
  };
  const handleRemoveWriteHashtag = (index: number) => {
    setHashtag((prevTag: string[]) => {
      const newHashtag = [...prevTag];
      newHashtag.splice(index, 1);
      return newHashtag;
    });
  };
  const onChangeWriteLocation = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWriteLocation(e.target.value);
  };
  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContents(e.target.value);
  };
  const onChangHashtag = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWriteHashTag(e.target.value);
  };

  useEffect(() => {
    if (!settingType) {
      setToastModal(false);
    }
  }, [locationType]);

  useEffect(() => {
    resetLocationInfo();
    resetLocationData();
  }, []);

  return (
    <>
      {alarmModal === 1 ? (
        <Modal
          type={""}
          contents={"리뷰를 등록하시겠습니까?"}
          conform={() => setAlarmModal(0)}
          conform_txt={"확인"}
          cancel={() => setAlarmModal(0)}
          cancel_txt={"취소"}
        />
      ) : alarmModal === 2 ? (
        ""
      ) : (
        ""
      )}
      <div className={`popup_bg ${toastModal}`}></div>
      <ToastPopup ready={toastModal} popupType={"write"} />
      <div className="inner_section">
        <div className="write_form">
          <div className="location_select">
            <div className="section_title">장소명 선택</div>
            <div className="radio_box flex">
              <div className="mar_rh_5">
                <input
                  type="radio"
                  id="location_search"
                  name="location_type"
                  value={"search"}
                  checked={settingType}
                  onChange={(e: any) => setLocationType(e.target.value)}
                />
                <label htmlFor="location_search" className="flex">
                  장소 검색
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="write_location"
                  name="location_type"
                  value={"write"}
                  checked={!settingType}
                  onChange={(e: any) => setLocationType(e.target.value)}
                />
                <label htmlFor="write_location" className="flex">
                  직접 입력
                </label>
              </div>
            </div>
          </div>
          <div className="search_section relative flex flex_jc_sb flex_ai_c">
            <input
              type="text"
              className={`keyword_input ${settingType ? "enable" : ""}`}
              placeholder="장소명을 입력하세요"
              id="write_location_keyword"
              readOnly={settingType}
              value={settingType ? locationInfo.placeName : writeLocation}
              onChange={!settingType ? onChangeWriteLocation : undefined}
              onClick={settingType ? () => handleOpenToastPopup() : undefined}
            />
            <label htmlFor="write_location_keyword" className="absolute">
              <SearchIcon color={"#959292"} />
            </label>
            <div
              className={`btn flex flex_jc_c flex_ai_c ${
                settingType ? "disable" : ""
              }`}
              onClick={() =>
                console.log(
                  "직접 입력한 장소와 현재 위도,경도,주소를 recoil로!"
                )
              }
            >
              확인
            </div>
          </div>
          <div className="line inline_flex"></div>
          <div className="score_section">
            <div className="section_title">별점을 선택해주세요</div>
            <div className="star_section flex">
              <StarScore max={5} />
            </div>
          </div>
          <div className="line inline_flex"></div>
          <div className="input_section">
            <textarea
              name="contents"
              value={contents}
              onChange={onChangeContents}
              placeholder="리뷰를 작성해주세요 (100자 이내)"
            ></textarea>
          </div>
          <div className="hashtag_section flex flex_jc_sb flex_ai_c flex_wrap_wrap">
            <div className="input_box relative">
              <LogoIcon
                style={{ position: "absolute", top: "30%", left: "6%" }}
              />
              <Input
                id={"write_hashtag"}
                name={""}
                value={writeHashTag}
                onChange={onChangHashtag}
                onBlur={null}
                type={"text"}
                maxLength={10}
                placeholder={"해시태그를 입력해주세요"}
                readonly={false}
                styles={maxHashtag ? "disable" : ""}
              />
            </div>
            <div className="btn_box">
              <Button
                title={"추가"}
                width={""}
                event={() => handleAddWriteHashtag()}
                styles={`btn flex flex_jc_c flex_ai_c ${
                  maxHashtag ? "disable" : ""
                }`}
              />
            </div>
            <div className="write_state_hashtag">
              <ul className="flex flex_wrap_wrap">
                {hashtag.map((text: string, index: number) => (
                  <li
                    key={text}
                    onClick={() => handleRemoveWriteHashtag(index)}
                  >
                    <HashTag tag={text} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="image_section">
              <div>
                <input
                  id="image_file"
                  type="file"
                  accept="image/*"
                  ref={imgRef}
                  multiple
                  onChange={(e) => handleAddImages(e as FileInputChangeEvent)}
                />
              </div>
              <div className="thumb_img flex flex_ai_fe">
                {uploadImage.map((image: any, id: any) => (
                  <span key={id} className="relative">
                    <div className="img_box relative flex flex_ai_c">
                      <img src={image} alt={`${image}-${id}`} width={70} />
                    </div>
                    <div
                      className="del_btn flex flex_jc_c flex_ai_c"
                      // onClick={() => handleDeleteImage(id)}
                    >
                      +
                    </div>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="write_btn btn_box absolute">
            <Button
              title={"등록하기"}
              width={"100%"}
              event={() => console.log("대기중")}
              styles={"buttons flex flex_jc_c flex_ai_c width_100p cursor_p"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteReview;
