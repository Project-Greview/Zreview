// MODULE
import { useLayoutEffect, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useInView } from "react-intersection-observer";
// HOOK
import { getCookie } from "utils/cookies";
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
  const [page, setPage] = useRecoilState(paginationState);
  const [toastModal, setToastModal] = useRecoilState(toastPopupState);
  const [loading, setLoading] = useState<boolean>(false);

  const keyword = useRecoilValue(searchKeywordState);
  const locationResult = useRecoilValue(locationSearchResultState);
  const maxPage = useRecoilValue(locationSearchResultState).maxPage;
  const searchType = useRecoilValue(searchTypeState);

  useLayoutEffect(() => {
    setLoading(true);
  }, []);
  useEffect(() => {
    if (inView) {
      setPage(page < maxPage ? page + 1 : page);
    }
  }, [inView]);
  return (
    <div
      className={`toast_section absolute ${
        toastModal && loading ? "active" : ""
      }`}
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
      <div className="toast_body">
        {searchType ? (
          "ㅁㅁㅁ"
        ) : (
          <ul>
            {locationResult.result.map((item: any, index: number) => {
              function getDistance(
                lat1: number,
                lng1: number,
                lat2: number,
                lng2: number
              ) {
                const R = 6371000;

                const dLat = ((lat2 - lat1) * Math.PI) / 180;
                const dLon = ((lng2 - lng1) * Math.PI) / 180;

                const a =
                  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos((lat1 * Math.PI) / 180) *
                    Math.cos((lat2 * Math.PI) / 180) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);

                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                return Math.floor(R * c);
              }

              const lat1 = Number(getCookie("UserLat"));
              const lng1 = Number(getCookie("UserLon"));
              const lat2 = item.y;
              const lng2 = item.x;

              const distance = getDistance(lat1, lng1, lat2, lng2);
              return (
                <>
                  <ResultItem key={item.id} data={item} range={distance} />
                  {index === item.length - 1 ? <li ref={ref}></li> : ""}
                </>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ToastPopup;
