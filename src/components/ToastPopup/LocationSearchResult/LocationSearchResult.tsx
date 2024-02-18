// MODULE
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { useInView } from "react-intersection-observer";
// RECOIL STATE
import { paginationState } from "state/commonState";
import {
  searchTypeState,
  searchResultState,
  locationSearchResultState,
  inViewState,
} from "state/searchState";
// COMPONENT
import ResultItem from "../ResultItem";
// PROPS TYPE
type LocationSearchResultType = {
  popupType: string;
  BodyHeight: number;
  moveSize: number;
  lat: number;
  lng: number;
};
const LocationSearchResult: React.FC<LocationSearchResultType> = ({
  popupType,
  BodyHeight,
  moveSize,
  lat,
  lng,
}) => {
  const [ref, inView] = useInView();
  const navigate = useNavigate();

  const [page, setPage] = useRecoilState<number>(paginationState);
  const [scrollView, setScrollView] = useRecoilState(inViewState);

  const maxPage = useRecoilValue(locationSearchResultState).maxPage;
  const searchType = useRecoilValue(searchTypeState);
  const resultData = useRecoilValue(searchResultState);

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
  return (
    <div
      className="toast_body"
      style={{
        maxHeight: `${BodyHeight}px`,
        height:
          popupType !== "write"
            ? moveSize < -10
              ? `${BodyHeight}px`
              : "20vh"
            : "",
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
  );
};

export default LocationSearchResult;
