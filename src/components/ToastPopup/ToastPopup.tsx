// MODULE
import { useLayoutEffect, useState, useEffect, TouchEvent } from "react";
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
} from "state/searchState";
import ResultItem from "./ResultItem";
// PROPS TYPE
type ToastPopupProps = {
  ready: boolean;
};

const ToastPopup: React.FC<ToastPopupProps> = ({ ready }) => {
  const [ref, inView] = useInView();
  const navigate = useNavigate();
  const [page, setPage] = useRecoilState(paginationState);
  const [toastModal, setToastModal] = useRecoilState(toastPopupState);
  const [loading, setLoading] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [moveSize, setMoveSize] = useState<number>(0);

  const keyword = useRecoilValue(searchKeywordState);
  const locationResult = useRecoilValue(locationSearchResultState);
  const maxPage = useRecoilValue(locationSearchResultState).maxPage;
  const searchType = useRecoilValue(searchTypeState);

  navigator.geolocation.getCurrentPosition((position: any) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  });
  useLayoutEffect(() => {
    setLoading(true);
  }, []);
  useEffect(() => {
    if (inView) {
      setPage(page < maxPage ? page + 1 : page);
      console.log("무한으로 즐겨요");
    }
  }, [inView]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setStartY(event.touches[0].clientY);
  };

  const handleTouchMove = throttle((event: TouchEvent<HTMLDivElement>) => {
    const currentY = event.touches[0].clientY;
    const deltaY = currentY - startY;
    setMoveSize(deltaY / 10);
  }, 100);
  const cleanResult = useResetRecoilState(locationSearchResultState);

  const dragCloseModal = () => {
    setToastModal(false);
    cleanResult();
  };
  useEffect(() => {
    moveSize > 10 ? dragCloseModal() : setToastModal(true);
  }, [moveSize]);

  return (
    <div
      className={`toast_section absolute ${
        toastModal && loading ? "active" : ""
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="toast_header flex flex_dir_c flex_jc_c flex_ai_c">
        <div className="drag_icon"></div>
        {searchType ? (
          "ㅁㅁㅁ"
        ) : (
          <div className="keyword_result_header flex flex_jc_s flex_ai_c flex_as_s">
            <p>{locationResult.totalCount}개</p>&nbsp;의 가게가 있어요!
          </div>
        )}
      </div>
      <div
        className="toast_body"
        style={{ height: moveSize < -10 ? "70vh" : "20vh" }}
      >
        {searchType ? (
          "ㅁㅁㅁ"
        ) : (
          <ul>
            {locationResult.result.map((item: any, index: number) => {
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
                  ref={index > locationResult.result.length - 1 ? ref : null}
                  onClick={() =>
                    navigate(`/place_review`, { state: { placeData: item } })
                  }
                >
                  <ResultItem data={item} range={distance} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ToastPopup;
