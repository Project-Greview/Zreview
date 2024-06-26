/**
 * 사용자 리뷰 작성 페이지
 * Page
 */
// MODULE
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
// HOOK
import { addDataToIndexedDB } from "api/IDBreview";
import {
  addPlaceDataToIndexedDB,
  patchPlaceDataFromIndexedDB,
  getPlaceDataFromIndexedDB,
} from "api/IDBplace";
import { getCookie } from "utils/cookies";

// RECOIL STATE
import { toastPopupState } from "state/commonState";
import {
  reviewLocationInfoState,
  reviewSearchResultState,
  resizeUploadImageState,
  originUploadState,
  starScoreState,
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
type ReviewDataType = {
  place_name: string;
  place_address: string;
  placeDepth3: string;
  content: string;
  location_lat: number;
  location_lon: number;
  created_at: string;
  updated_at: string;
  hashtag: string[];
  images: string[];
  views: number;
  rating: number;
  likes: number;
  comments: number;
};
type CalcScoreType = {
  score: number;
  key: any | string | number;
};
type PlaceInfoType = {
  place_name: string;
  location_lat: number;
  location_lon: number;
  place_address: string;
  placeDepth3: string;
};
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
  const [content, setContent] = useState<any>("");
  const [writeHashTag, setWriteHashTag] = useState<string>("");
  const [hashtag, setHashtag] = useState<any>([]);
  const [alarmModal, setAlarmModal] = useState<number>(0);
  const [, setLat] = useState<number>(0);
  const [, setLon] = useState<number>(0);
  const [placeId, setPlaceId] = useState<number>(0);
  const [hashCheck, setHashCheck] = useState<number>(0);

  let maxHashtag = hashtag.length === 3;
  const settingType = locationType === "search";

  const resetLocationInfo = useResetRecoilState(reviewLocationInfoState);
  const resetLocationData = useResetRecoilState(reviewSearchResultState);
  const resetImageState = useResetRecoilState(originUploadState);
  const locationInfo = useRecoilValue(reviewLocationInfoState);
  const score = useRecoilValue(starScoreState);

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
  // IS PLACE IN DB
  const setPlaceInfo = async (data: any) => {
    try {
      const response: any = await addPlaceDataToIndexedDB(data);
      setPlaceId(response.target.result);
    } catch (error) {
      console.log(error);
    }
  };
  const onBlurPlaceCheck = async () => {
    const place_info: PlaceInfoType = {
      place_name: writeLocationData.placeName,
      location_lat: Number(writeLocationData.placeLatitude),
      location_lon: Number(writeLocationData.placeLongitude),
      place_address: writeLocationData.placeAddress,
      placeDepth3: writeLocationData.placeDepth3,
    };
    try {
      const response: any = await getPlaceDataFromIndexedDB(place_info);
      if (response.length === 0) {
        setPlaceInfo(place_info);
      } else {
        setPlaceId(response[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // STATE REGISTER POSITION
  // 사용자가 직접 장소명 입력 이벤트
  const handleWritePlacePosition = () => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      let geocoder = new window.kakao.maps.services.Geocoder();
      let callback = function (result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          setWriteLocationData({
            placeName: writeLocation,
            placeLatitude: position.coords.latitude,
            placeLongitude: position.coords.longitude,
            placeAddress: result[1].address_name,
            placeDepth3: result[0].region_3depth_name,
          });
        }
      };
      geocoder.coord2RegionCode(
        position.coords.longitude,
        position.coords.latitude,
        callback
      );
    });
  };

  const onChangeWriteLocation = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWriteLocation(e.target.value);
  };
  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
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
  const handleReviewPOST = async () => {
    const postData: any | ReviewDataType = {
      place_name: writeLocationData.placeName,
      location_lat: Number(writeLocationData.placeLatitude),
      location_lon: Number(writeLocationData.placeLongitude),
      place_address: writeLocationData.placeAddress,
      placeDepth3: writeLocationData.placeDepth3,
      content: content,
      hashtag: hashtag,
      rating: score,
      images: uploadImage,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      views: 0,
      likes: 0,
      comments: 0,
      member_id: Number(getCookie("user").id),
    };
    try {
      const response = await addDataToIndexedDB(postData);
      if (response === "success") {
        calcPlaceScore();
        setAlarmModal(2);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // CALC PLACE SCORE
  // 해당 장소에 대한 점수 API
  const calcPlaceScore = async () => {
    const calcScore: CalcScoreType = {
      score:
        score === 1
          ? -2
          : score === 2
          ? -1
          : score === 3
          ? +0
          : score === 4
          ? +1
          : +2,
      key: placeId,
    };
    try {
      const response = await patchPlaceDataFromIndexedDB(calcScore);
    } catch (error) {
      console.log(error);
    }
  };
  // ADD HASHTAG
  const handleAddWriteHashtag = () => {
    if (writeHashTag.length <= 0) {
      setHashCheck(1);
    } else if (
      hashtag.some((element: any) => {
        if (element === writeHashTag) {
          return true;
        }
      })
    ) {
      setHashCheck(2);
    } else if (!maxHashtag) {
      setHashtag((prevTag: any) => [...prevTag, writeHashTag]);
      setWriteHashTag("");
      setHashCheck(0);
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
    resetImageState();
  }, []);

  useEffect(() => {
    if (state !== null) {
      setWriteLocationData({
        placeName: state.place_name,
        placeLatitude: state.location_lat,
        placeLongitude: state.location_lon,
        placeAddress: state.place_address,
        placeDepth3: state.placeDepth3,
      });
    }
  }, []);
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
          conform={() => navigate("/main")}
          conform_txt={"확인"}
          cancel={null}
          cancel_txt={""}
        />
      ) : (
        alarmModal === 3 && ""
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
              value={settingType ? locationInfo.placeName : writeLocation}
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
            <button
              className={`write_place btn flex flex_jc_c flex_ai_c ${
                settingType ? "disable" : ""
              } ${onBlurWritePlace()}`}
              onClick={handleWritePlacePosition}
            >
              확인
            </button>
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
              value={content}
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
              <div className={`event_txt absolute`}>
                {hashCheck === 1
                  ? "해시태그를 입력해주세요."
                  : hashCheck === 2 && "동일한 태그가 있어요."}
              </div>
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
                    <button
                      className="del_btn absolute flex flex_jc_c flex_ai_c"
                      onClick={() => handleDeleteImage(id)}
                    >
                      <div className="absolute"></div>
                      <div className="absolute"></div>
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="write_btn btn_box fixed">
            <Button
              title={"등록하기"}
              width={"100%"}
              event={() => (setAlarmModal(1), onBlurPlaceCheck())}
              styles={"buttons flex flex_jc_c flex_ai_c width_100p cursor_p"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteReview;
