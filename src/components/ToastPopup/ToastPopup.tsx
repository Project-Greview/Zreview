// MODULE
import {
  useLayoutEffect,
  useState,
  useEffect,
  TouchEvent,
  ChangeEvent,
} from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import throttle from "lodash/throttle";
// HOOK
import { getDistanceCalc } from "utils/distanceCalc";
import { getAllTargetDataFromIndexedDB } from "api/IDBreview";
// RECOIL STATE
import { toastPopupState, paginationState } from "state/commonState";
import {
  searchTypeState,
  locationSearchResultState,
  searchKeywordState,
  searchResultState,
} from "state/searchState";
import {
  reviewStoreSearchResultState,
  reviewSearchResultState,
} from "state/writeState";
import { mapMarkerState } from "state/mapMarkerState";
// COMPONENT
import Input from "components/Common/Input";
import WriteBody from "./WriteBody";
import LocationSearchResult from "./LocationSearchResult";
import MarkerBody from "./MarkerBody";
import HashTag from "components/HashTag";
// SVG
import { ReactComponent as ArrowIcon } from "../../assets/image/icon/arrow-left.svg";
import { ReactComponent as SearchIcon } from "../../assets/image/icon/keyword_search.svg";
import { ReactComponent as CloseIcon } from "../../assets/image/icon/close_btn.svg";
import { ReactComponent as ScoreIcon } from "../../assets/image/icon/Score_star.svg";
import { ReactComponent as DefaultMarkerIcon } from "../../assets/image/icon/default_marker.svg";
import { ReactComponent as BookMarkIcon } from "../../assets/image/icon/Bookmark-icon.svg";
// PROPS TYPE
type ToastPopupProps = {
  ready: boolean;
  popupType: string;
};

const ToastPopup: React.FC<ToastPopupProps> = ({ ready, popupType }) => {
  const navigate = useNavigate();
  const [page, setPage] = useRecoilState<number>(paginationState);
  const [toastModal, setToastModal] = useRecoilState(toastPopupState);
  const [loading, setLoading] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [moveSize, setMoveSize] = useState<number>(0);
  const [reviewKeyword, setReviewKeyword] = useState<string>("");
  const [markerDistance, setMarkerDistance] = useState<number>(0);
  const [reviewStoreList, setReviewStoreList] = useRecoilState<any>(
    reviewSearchResultState
  );
  const [reviewStoreResult, setReviewStoreResult] = useRecoilState(
    reviewStoreSearchResultState
  );

  const keyword = useRecoilValue(searchKeywordState);
  const locationResult = useRecoilValue(locationSearchResultState);
  const searchType = useRecoilValue(searchTypeState);
  const markerData = useRecoilValue<any>(mapMarkerState);
  console.log("markerData", markerData);
  const cleanResultInfo = useResetRecoilState(locationSearchResultState);
  const cleanPages = useResetRecoilState(paginationState);
  const cleanResult = useResetRecoilState(searchResultState);
  const cleanWriteResultInfo = useResetRecoilState(
    reviewStoreSearchResultState
  );
  const cleanWriteResult = useResetRecoilState(reviewSearchResultState);
  const clearMarkerData = useResetRecoilState(mapMarkerState);

  const BodyHeight: number = window.innerHeight * 0.7;
  navigator.geolocation.getCurrentPosition((position: any) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  });

  const onChangeReviewKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setReviewKeyword(e.target.value);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setStartY(event.touches[0].clientY);
  };
  // MAIN SEARCH RESET
  const resetResult = () => {
    cleanResultInfo();
    cleanResult();
    cleanPages();
    clearMarkerData();
  };
  // WRITE SEARCH RESET
  const writeResetResult = () => {
    cleanWriteResult();
    cleanWriteResultInfo();
    cleanPages();
    clearMarkerData();
  };

  const handleTouchMove = throttle((event: TouchEvent<HTMLDivElement>) => {
    const currentY = event.touches[0].clientY;
    const deltaY = currentY - startY;
    setMoveSize(deltaY / 10);
  }, 100);

  const dragCloseModal = () => {
    setToastModal(false);
    setReviewKeyword("");
    resetResult();
    writeResetResult();
    clearMarkerData();
  };
  // REVIEW STORE SEARCH
  const handleSearchLocation = () => {
    if (reviewKeyword.length === 0) {
      alert("검색어가 없어요.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const ps = new window.kakao.maps.services.Places();
          const searchOption = {
            location: new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            radius: 500,
            size: 15,
            page: page,
          };
          // SEARCH FUNCTION
          ps.keywordSearch(reviewKeyword, placeSearchDB, searchOption);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  };
  function placeSearchDB(data: any, status: any, pagination: any): any {
    if (status === window.kakao.maps.services.Status.OK) {
      setReviewStoreList((prevData: any) => [...prevData, ...data]);
      setReviewStoreResult({
        totalCount: pagination.totalCount,
        maxPage: pagination.last,
      });
      console.log(pagination);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      // return status;
      console.log(data);
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      return status;
    }
  }

  const handleMobileBrowsersEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      writeResetResult();
      handleSearchLocation();
    }
  };

  // useEffect(() => {
  //   if (page > 1) {
  //     handleSearchLocation();
  //   }
  // }, [page]);

  useLayoutEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    moveSize > 10 ? dragCloseModal() : setToastModal(true);
  }, [moveSize]);

  useEffect(() => {
    if (markerData !== null) {
      setMarkerDistance(
        getDistanceCalc(
          markerData[0]?.location_lat,
          markerData[0]?.location_lon,
          lat,
          lng
        )
      );
    }
  }, [markerData]);
  return (
    <div
      className={`toast_section fixed ${
        toastModal && loading ? "active" : ""
      } ${popupType}`}
    >
      <div
        className="toast_header flex flex_dir_c flex_jc_c flex_ai_c"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="drag_icon"></div>
        {popupType === "write" ? (
          <div className="review_store_search_header width_100p">
            <div className="title flex flex_jc_sb flex_ai_c">
              <ArrowIcon
                onClick={() => setToastModal(false)}
                style={{ zIndex: 1 }}
              />
              <div className="page_title flex flex_jc_c flex_ai_c">
                장소검색
              </div>
            </div>
            <div className="keyword_input relative">
              <SearchIcon
                color={"#D0CFCF"}
                onClick={() => (writeResetResult(), handleSearchLocation())}
                onKeyDown={handleMobileBrowsersEnterKey}
              />
              <Input
                id={"keyword"}
                name={""}
                value={reviewKeyword}
                onChange={onChangeReviewKeyword}
                onBlur={null}
                type={"text"}
                maxLength={25}
                placeholder={"지번,도로명,건물명으로 검색"}
                readonly={false}
                styles={""}
              />
              {reviewKeyword.length > 0 ? (
                <div
                  className="clear_keyword_btn absolute"
                  onClick={() => setReviewKeyword("")}
                >
                  <CloseIcon color={"#D0CFCF"} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : markerData !== null ? (
          <div className="marker_result_header flex flex_dir_c flex_jc_sb flex_ai_c flex_wrap_wrap width_100p">
            <div className="flex flex_jc_sb flex_ai_c width_100p">
              <div className="distance flex">
                <div>
                  {markerDistance / 1000 > 1
                    ? markerDistance + "km"
                    : markerDistance + "m"}
                </div>
                <div className="review_count relative flex flex_ai_c">
                  <p>리뷰</p>
                  <p>{markerData.length}</p>
                </div>
              </div>
              <div className="score flex flex_ai_c">
                <ScoreIcon width={14} height={14} color={"#6656ff"} />
                <p>{markerData[0].rating}</p>
              </div>
            </div>
            <div className="place_info flex flex_dir_c flex_jc_s flex_ai_s width_100p">
              <p className="place_name">{markerData[0].place_name}</p>
              <div className="place_address flex">
                <DefaultMarkerIcon />
                <div>{markerData[0].place_address}</div>
              </div>
            </div>
            <div className="best_hashtag_list flex flex_jc_s flex_ai_fs width_100p">
              <ul className="flex">
                {/* 현재는 Dummy Data 내에 있는 태그 3개만 보여주지만 추후 가장 많이 작성된 6개까지 미리보여질 예정 */}
                {/* {markerData.hashtag.map((txt) => (
                  <li key={txt}>
                    <HashTag tag={txt} />
                  </li>
                ))} */}
              </ul>
            </div>
            <div className=" btn_box flex flex_jc_sb flex_ai_c width_100p">
              <button className="store_bookmark">
                <BookMarkIcon color={"#ffffff"} />
              </button>
              <button
                className="store_review_write"
                onClick={() =>
                  navigate("/place_review", {
                    state: { placeData: markerData[0] },
                  })
                }
              >
                리뷰 보러가기
              </button>
            </div>
          </div>
        ) : searchType ? (
          "ㅁㅁㅁ"
        ) : (
          <div className="keyword_result_header flex flex_jc_s flex_ai_c flex_as_s">
            <p>{locationResult.totalCount}개</p>&nbsp;의 가게가 있어요!
          </div>
        )}
      </div>
      {popupType === "write" ? (
        <WriteBody />
      ) : markerData !== null ? (
        <MarkerBody data={markerData} />
      ) : (
        <LocationSearchResult
          popupType={popupType}
          BodyHeight={BodyHeight}
          moveSize={moveSize}
          lat={lat}
          lng={lng}
        />
      )}
    </div>
  );
};

export default ToastPopup;
