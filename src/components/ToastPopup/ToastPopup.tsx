// MODULE
import {
  useLayoutEffect,
  useState,
  useEffect,
  TouchEvent,
  ChangeEvent,
} from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import throttle from "lodash/throttle";
// HOOK
// RECOIL STATE
import { toastPopupState, paginationState } from "state/commonState";
import {
  searchTypeState,
  locationSearchResultState,
  searchKeywordState,
  searchResultState,
  inViewState,
} from "state/searchState";
import {
  reviewStoreSearchResultState,
  reviewSearchResultState,
  reviewLocationInfoState,
} from "state/writeState";
// COMPONENT
import Input from "components/Common/Input";
import ResultItem from "./ResultItem";
// SVG
import { ReactComponent as ArrowIcon } from "../../assets/image/icon/arrow-left.svg";
import { ReactComponent as SearchIcon } from "../../assets/image/icon/keyword_search.svg";
import { ReactComponent as CloseIcon } from "../../assets/image/icon/close_btn.svg";
// PROPS TYPE
type ToastPopupProps = {
  ready: boolean;
  popupType: string;
};
type WriteToastProps = {};
const WriteToastContent: React.FC<WriteToastProps> = () => {
  const [ref, inView] = useInView();

  const [selectIndex, setSelectIndex] = useState<number>(-1);
  const [locationData, setLocationData] = useRecoilState(
    reviewLocationInfoState
  );

  const storeSearchResult = useRecoilValue<any>(reviewSearchResultState);

  const handleSelectPlace = (info: any, number: number) => {
    setLocationData({
      placeName: info.place_name,
      placeLatitude: info.y,
      placeLongitude: info.x,
      placeAddress:
        info.road_address_name === undefined
          ? info.address_name
          : info.road_address_name,
    });
    setSelectIndex(number);
  };
  return (
    <div className="write toast_body">
      <ul>
        {storeSearchResult.map((result: any, number: number) => (
          <li
            key={result.id}
            className={`place_item ${selectIndex === number ? "active" : ""}`}
            onClick={() => handleSelectPlace(result, number)}
          >
            <div className="place_name">{result.place_name}</div>
            <div className="place_address">
              {result.road_address_name === undefined
                ? result.address_name
                : result.road_address_name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ToastPopup: React.FC<ToastPopupProps> = ({ ready, popupType }) => {
  const [ref, inView] = useInView();
  const navigate = useNavigate();
  const [page, setPage] = useRecoilState<number>(paginationState);
  const [toastModal, setToastModal] = useRecoilState(toastPopupState);
  const [scrollView, setScrollView] = useRecoilState(inViewState);
  const [loading, setLoading] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [moveSize, setMoveSize] = useState<number>(0);
  const [reviewKeyword, setReviewKeyword] = useState<string>("");
  const [reviewStoreList, setReviewStoreList] = useRecoilState<any>(
    reviewSearchResultState
  );
  const [reviewStoreResult, setReviewStoreResult] = useRecoilState(
    reviewStoreSearchResultState
  );

  const keyword = useRecoilValue(searchKeywordState);
  const locationResult = useRecoilValue(locationSearchResultState);
  const maxPage = useRecoilValue(locationSearchResultState).maxPage;
  const searchType = useRecoilValue(searchTypeState);
  const resultData = useRecoilValue(searchResultState);

  const cleanResultInfo = useResetRecoilState(locationSearchResultState);
  const cleanPages = useResetRecoilState(paginationState);
  const cleanResult = useResetRecoilState(searchResultState);
  const cleanWriteResultInfo = useResetRecoilState(
    reviewStoreSearchResultState
  );
  const cleanWriteResult = useResetRecoilState(reviewSearchResultState);

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
  };
  // WRITE SEARCH RESET
  const writeResetResult = () => {
    cleanWriteResult();
    cleanWriteResultInfo();
    cleanPages();
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
  };
  // REVIEW STORE SEARCH
  const handleSearchLocation = () => {
    if (reviewKeyword.length === 0) {
      // alert("검색어가 없어요.");
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
      // setResultData((prevData: any) => [...prevData, ...data]);
      // setSearchKeyword(locationText);
      // setToastModal(true);
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

  useEffect(() => {
    if (page > 1) {
      handleSearchLocation();
    }
  }, [page]);

  useLayoutEffect(() => {
    setLoading(true);
  }, []);
  useEffect(() => {
    if (inView) {
      setPage(maxPage <= page ? page : page + 1);
      console.log("page", page);
      console.log("maxPage", maxPage);
      setScrollView(inView);
    } else {
      setScrollView(inView);
    }
  }, [inView]);
  useEffect(() => {
    moveSize > 10 ? dragCloseModal() : setToastModal(true);
  }, [moveSize]);
  return (
    <div
      className={`toast_section fixed ${
        toastModal && loading ? "active" : ""
      } ${popupType}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="toast_header flex flex_dir_c flex_jc_c flex_ai_c">
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
        ) : searchType ? (
          "ㅁㅁㅁ"
        ) : (
          <div className="keyword_result_header flex flex_jc_s flex_ai_c flex_as_s">
            <p>{locationResult.totalCount}개</p>&nbsp;의 가게가 있어요!
          </div>
        )}
      </div>
      {popupType === "write" ? (
        <WriteToastContent />
      ) : (
        <div
          className="toast_body"
          style={{
            height:
              popupType !== "write" ? (moveSize < -10 ? "70vh" : "20vh") : "",
          }}
        >
          {searchType ? (
            "ㅁㅁㅁ"
          ) : (
            <ul>
              {resultData.map((item: any, index: number) => {
                function getDistance(
                  lat: number,
                  lng: number,
                  lat2: number,
                  lng2: number
                ) {
                  const R = 6371000;

                  const dLat = ((lat2 - lat) * Math.PI) / 180;
                  const dLon = ((lng2 - lng) * Math.PI) / 180;

                  const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos((lat * Math.PI) / 180) *
                      Math.cos((lat2 * Math.PI) / 180) *
                      Math.sin(dLon / 2) *
                      Math.sin(dLon / 2);

                  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                  return Math.floor(R * c);
                }

                const lat2 = item.y;
                const lng2 = item.x;

                const distance = getDistance(lat, lng, lat2, lng2);
                return (
                  <li
                    key={item.id}
                    ref={index > resultData.length - 2 ? ref : null}
                    onClick={() =>
                      navigate(`/place_review`, {
                        state: { placeData: item },
                      })
                    }
                  >
                    <ResultItem data={item} range={distance} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ToastPopup;
