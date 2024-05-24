// MODULE
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
// HOOK
import { getMyWriteReviewFromIndexedDB } from "api/IDBreview";
import { getCookie } from "utils/cookies";
// RECOIL STATE
import { tabMenuTypeState } from "state/mypageTabState";
// COMPONENT
import DetailItem from "components/DetailItem";
// PROPS TYPE
type TabItemProps = {};
type ReviewDataType = {
  id: number;
  place_name: string;
  place_address: string;
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
  writer: string;
  profile: string;
};
const TabItem: React.FC<TabItemProps> = () => {
  const [WriteData, setWriteData] = useState([]);

  const getType = useRecoilValue(tabMenuTypeState);

  const getNickname = getCookie("user").nickname;
  const box1Height = document
    .querySelector(".scroll_section ")
    ?.getBoundingClientRect().height;
  const box2Height = document
    .querySelector(".tab_buttons ")
    ?.getBoundingClientRect().height;

  useEffect(() => {
    getMyWriteReviewFromIndexedDB(1, getNickname)
      .then((data: ReviewDataType | any) => {
        setWriteData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);
  return (
    <div
      className="list_section"
      style={{
        minHeight: `calc(100vh - ((${box1Height}px + ${box2Height}px) + 69px))`,
      }}
    >
      <div className="count flex flex_jc_s flex_ai_c">
        <div>
          {getType === "review"
            ? "내가 작성한 리뷰"
            : getType === "comment"
            ? "내가 작성한 댓글"
            : "내가 좋아요 한 리뷰"}
        </div>
        <div>
          {getType === "review"
            ? `(${WriteData.length})`
            : getType === "comment"
            ? `(${0})`
            : `(${0})`}
        </div>
      </div>
      {getType === "review" && (
        <DetailItem resultData={WriteData} place={""} type={"mypage"} />
      )}
    </div>
  );
};

export default TabItem;
