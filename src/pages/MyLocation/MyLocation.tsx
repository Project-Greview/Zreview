// MODULE
import { useEffect, useState } from "react";
// RECOIL STATE
// HOOK
import { getCookie } from "utils/cookies";
import {
  getHashtagRankingFromIndexedDB,
  getMyLocationReviewFromIndexedDB,
} from "api/IDBreview";
// UTIL
import { extractNeighborhoodType } from "utils/location";
// COMPONENT
import HashTag from "components/HashTag";
import MyLocationMap from "components/MyLocation/MyLocationMap";
import ThumbnailItem from "components/ThumbnailItem";
// PROPS TYPE
type MyLocationProps = {};

const MyLocation: React.FC<MyLocationProps> = () => {
  const [topHashtag, setTopHashTag] = useState<any>(null);
  const [myLocationReview, setMyLocationReview] = useState<any>(null);
  const myLocation = getCookie("user").location;

  // 추후 내 위치 기반 or 내가 등록한 동네 기준으로 변경필요
  useEffect(() => {
    getHashtagRankingFromIndexedDB(
      Number(getCookie("UserLat")),
      Number(getCookie("UserLon"))
    )
      .then((data: any) => {
        setTopHashTag(data);
      })
      .catch((error) => {
        console.log(error);
      });
    getMyLocationReviewFromIndexedDB(extractNeighborhoodType(myLocation))
      .then((data: any) => {
        console.log(data);
        setMyLocationReview(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="my_location_section view_section">
      <div className="sub_section">
        <p className="sub_tit">{extractNeighborhoodType(myLocation)}</p>
        <MyLocationMap />
      </div>
      <div className="sub_section">
        <p className="sub_tit">우리동네 Best 태그</p>
        <ul className="hashtag_list flex flex_jc_s flex_ai_c">
          {topHashtag !== null && topHashtag.length !== 0 ? (
            topHashtag.map((item: string, index: number) => (
              <li key={index}>
                <HashTag tag={item} />
              </li>
            ))
          ) : (
            <li>등록된 해시태그가 없어요.</li>
          )}
        </ul>
      </div>
      <div className="sub_section">
        <p className="sub_tit">우리동네 실시간 리뷰</p>
        {myLocationReview?.length > 0 ? (
          <ThumbnailItem type={"empty"} data={myLocationReview} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MyLocation;
