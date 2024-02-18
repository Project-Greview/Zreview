// MODULE
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useInView } from "react-intersection-observer";
// RECOIL PROPS
import { reviewLocationInfoState } from "state/writeState";
import { reviewSearchResultState } from "state/writeState";
// PROPS TYPE
type WriteBodyProps = {};

const WriteBody: React.FC<WriteBodyProps> = () => {
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
  const BodyHeight: number = window.innerHeight * 0.8;
  return (
    <div className="write toast_body" style={{ maxHeight: `${BodyHeight}px` }}>
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

export default WriteBody;
