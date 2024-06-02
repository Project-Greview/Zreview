// MODULE
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { useInView } from "react-intersection-observer";
// HOOK
import { getDistanceCalc } from "utils/distanceCalc";
// UTIL
import { extractNeighborhood } from "utils/location";
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
            const distance = getDistanceCalc(lat, lng, item.y, item.x);
            const placeDepth3 = extractNeighborhood(item.address_name);
            return (
              <li
                key={item.id}
                ref={index > resultData.length - 2 ? ref : null}
                onClick={() =>
                  navigate(`/place_review`, {
                    state: { placeData: item, placeDepth3: placeDepth3 },
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
