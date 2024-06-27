// MODULE
// API
import { postReviewLikeFromIndexedDB } from "api/IDBlike";
// UTIL
import { getCookie } from "utils/cookies";
// SVG
import { ReactComponent as LikeIcon } from "../../../assets/image/icon/like_icon.svg";
// TYPE
type LikeType = {
  count: number;
  reviewId: string | any;
  commentId: string | any;
  type: string;
};
export const Like: React.FC<LikeType> = ({
  count,
  reviewId,
  commentId,
  type,
}) => {
  const handleLikeToggle = async () => {
    try {
      const response = await postReviewLikeFromIndexedDB(
        reviewId !== null ? String(reviewId) : commentId,
        Number(getCookie("user").id),
        type
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="like_box flex flex_ai_c" onClick={() => handleLikeToggle()}>
      <LikeIcon color={"#e0ddff"} />
      {commentId === null && <p>{count}</p>}
    </div>
  );
};
