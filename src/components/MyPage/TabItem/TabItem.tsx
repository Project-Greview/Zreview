// MODULE
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
// RECOIL STATE
import { tabMenuTypeState } from "state/mypageTabState";
// COMPONENT
import ReviewItem from "components/ReviewItem";
// PROPS TYPE
type TabItemProps = {};

const TabItem: React.FC<TabItemProps> = () => {
  const [getHeight, setGetHeight] = useState<number>(0);
  const getType = useRecoilValue(tabMenuTypeState);
  const box1Height = document
    .querySelector(".scroll_section ")
    ?.getBoundingClientRect().height;
  const box2Height = document
    .querySelector(".tab_buttons ")
    ?.getBoundingClientRect().height;
  useEffect(() => {
    if (box1Height !== undefined && box2Height !== undefined) {
      setGetHeight(box1Height + box2Height);
    }
  }, []);
  return (
    <div
      className="list_section"
      style={{ minHeight: `calc(100vh - ${getHeight}px - 69px)` }}
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
            ? `(${0})`
            : getType === "comment"
            ? `(${0})`
            : `(${0})`}
        </div>
      </div>
      <ul>
        <ReviewItem />
      </ul>
    </div>
  );
};

export default TabItem;
