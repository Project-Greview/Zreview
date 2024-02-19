// MODULE
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
// RECOIL STATE
import { toastPopupState } from "state/commonState";
import { locationSearchResultState } from "state/searchState";
import {
  reviewLocationInfoState,
  reviewSearchResultState,
  resizeUploadImageState,
  originUploadState,
} from "state/writeState";
// COMPONENT
import ToastPopup from "components/ToastPopup";
import Input from "../../components/Common/Input";
import StarScore from "./ScoreStar";
import Button from "components/Common/Button";
import HashTag from "components/HashTag";
import Modal from "components/Modal";
import ImageUpload from "components/ImageUpload";
// SVG
import { ReactComponent as SearchIcon } from "../../assets/image/icon/keyword_search.svg";
import { ReactComponent as LogoIcon } from "../../assets/image/icon/marker_c.svg";
// PROPS TYPE
type WriteReviewProps = {};

const WriteReview: React.FC<WriteReviewProps> = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [toastModal, setToastModal] = useRecoilState<boolean>(toastPopupState);
  const [locationType, setLocationType] = useState<"search" | "write">(
    "search"
  );
  const [writeLocationData, setWriteLocationData] = useRecoilState<any>(
    reviewLocationInfoState
  );

  const [uploadImage, setUploadImage] = useRecoilState<any>(originUploadState);
  const [resizeImg, setResizeImg] = useRecoilState<any>(resizeUploadImageState);
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [writeLocation, setWriteLocation] = useState<string>("");
  const [contents, setContents] = useState("");
  const [writeHashTag, setWriteHashTag] = useState<string>("");
  const [hashtag, setHashtag] = useState<any>([]);
  const [alarmModal, setAlarmModal] = useState<number>(0);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  let maxHashtag = hashtag.length === 3;
  const settingType = locationType === "search";

  const resetLocationInfo = useResetRecoilState(reviewLocationInfoState);
  const resetLocationData = useResetRecoilState(reviewSearchResultState);
  const locationInfo = useRecoilValue(reviewLocationInfoState);

  const handleOpenToastPopup = () => {
    setToastModal(true);
  };
  // CHECK WRITE PLACE
  const onBlurWritePlace = () => {
    if (writeLocation.length > 2) {
      return "conform";
    } else {
      return "oppose";
    }
  };
  // STATE REGISTER POSITION
  const handleWritePlacePosition = () => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });

    setWriteLocationData({
      placeName: writeLocation,
      placeLatitude: lat,
      placeLongitude: lng,
    });
  };
  console.log(writeLocationData);

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
  // DELETE IMAGE
  const handleDeleteImage = (id: number) => {
    setUploadImage((prevTag: string[]) => {
      const newHashtag = [...prevTag];
      newHashtag.splice(id, 1);
      return newHashtag;
    });
    setResizeImg((prevTag: string[]) => {
      const newHashtag = [...prevTag];
      newHashtag.splice(id, 1);
      return newHashtag;
    });
  };
  // POST REVIEW
  const setAPICode = () => {
    console.log("리뷰작성 API 발동!");
  };
  const handleReviewPOST = async () => {
    try {
      const response = await setAPICode();
      console.log(response);
      setAlarmModal(2);
    } catch (error) {
      console.log(error);
    }
  };
  // ADD HASHTAG
  const handleAddWriteHashtag = () => {
    if (!maxHashtag) {
      setHashtag((prevTag: any) => [...prevTag, writeHashTag]);
      setWriteHashTag("");
    }
  };
  // REMOVE HASHTAG
  const handleRemoveWriteHashtag = (index: number) => {
    setHashtag((prevTag: string[]) => {
      const newHashtag = [...prevTag];
      newHashtag.splice(index, 1);
      return newHashtag;
    });
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

  useEffect(() => {
    if (state !== null) {
    }
  }, []);
  console.log("write", state);
  return (
    <>
      {alarmModal === 1 ? (
        <Modal
          type={"type_2"}
          contents={"리뷰를 등록하시겠습니까?"}
          conform={() => handleReviewPOST()}
          conform_txt={"확인"}
          cancel={() => setAlarmModal(0)}
          cancel_txt={"취소"}
        />
      ) : alarmModal === 2 ? (
        <Modal
          type={"type_2"}
          contents={"리뷰등록이 완료되었습니다!"}
          conform={() => setAlarmModal(99)}
          conform_txt={"확인"}
          cancel={null}
          cancel_txt={""}
        />
      ) : alarmModal === 3 ? (
        ""
      ) : alarmModal === 99 ? (
        <Modal
          type={"type_99"}
          contents={
            "리뷰등록이 완료되었다는 말은 사실 거짓입니다!\n" +
            "아직 백앤드쪽 작업이 완료되지 않아서 실제로 DB에 저장되지 않고 있습니다\n" +
            "현재 구상중인 작업은 프론트에서 브라우저DB에 저장시켜서 임시로 사용자들에게" +
            " 보여줄 수 있도록 작업을 진행해볼 예정입니다... ㅠㅠ\n" +
            " 빠른 시일내에 작업하도록 하겠습니다!"
          }
          conform={() => navigate("/main")}
          conform_txt={"홈으로"}
          cancel={() => setAlarmModal(0)}
          cancel_txt={"돌아가기"}
        />
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
                  onChange={
                    state !== null
                      ? undefined
                      : (e: any) => setLocationType(e.target.value)
                  }
                  readOnly={state !== null}
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
                  onChange={
                    state !== null
                      ? undefined
                      : (e: any) => setLocationType(e.target.value)
                  }
                  readOnly={state !== null}
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
              readOnly={settingType || state !== null}
              value={
                state !== null
                  ? state.place_name
                  : settingType
                  ? locationInfo.placeName
                  : writeLocation
              }
              onChange={!settingType ? onChangeWriteLocation : undefined}
              onClick={
                state === null
                  ? settingType
                    ? () => handleOpenToastPopup()
                    : undefined
                  : undefined
              }
              onBlur={settingType ? undefined : onBlurWritePlace}
            />
            <label htmlFor="write_location_keyword" className="absolute">
              <SearchIcon color={"#959292"} />
            </label>
            <div
              className={`write_place btn flex flex_jc_c flex_ai_c ${
                settingType ? "disable" : ""
              } ${onBlurWritePlace()}`}
              onClick={handleWritePlacePosition}
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
                {hashtag.length === 0 ? (
                  <li
                    className="empty_tag"
                    style={{ minHeight: "2.4rem" }}
                  ></li>
                ) : (
                  hashtag.map((text: string, index: number) => (
                    <li
                      key={text}
                      onClick={() => handleRemoveWriteHashtag(index)}
                    >
                      <HashTag tag={text} />
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="image_section flex flex_jc_s flex_ai_c">
              <ImageUpload />
              {uploadImage.map((image: any, id: any) => (
                <div
                  className="thumb_img relative flex flex_jc_c flex_ai_c"
                  key={id}
                >
                  <span>
                    <div className="img_box relative flex flex_ai_c">
                      <img src={image} alt={`${image}-${id}`} width={75} />
                    </div>
                    <div
                      className="del_btn absolute flex flex_jc_c flex_ai_c"
                      onClick={() => handleDeleteImage(id)}
                    >
                      <div className="absolute"></div>
                      <div className="absolute"></div>
                    </div>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="write_btn btn_box fixed">
            <Button
              title={"등록하기"}
              width={"100%"}
              event={() => setAlarmModal(1)}
              styles={"buttons flex flex_jc_c flex_ai_c width_100p cursor_p"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteReview;
