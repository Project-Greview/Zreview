// MODULE
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
// RECOIL STATE
// COMPONENT
import ProfileImage from "components/ProfileImage";
import HashTag from "components/HashTag";
import ImageSlide from "components/ImageSlide";
import Comment from "components/Comment";
import { Like } from "components/Common/Like/Like";
// UTIL
import { formattedDate } from "utils/dateCalc";
// IMAGE
import Logo from "../../assets/image/Logo.png";
// SVG
import { ReactComponent as ScoreIcon } from "../../assets/image/icon/Score_star.svg";
import { ReactComponent as CommentIcon } from "../../assets/image/icon/comment_icon.svg";
import { ReactComponent as RightArrow } from "../../assets/image/icon/arrow_right.svg";
// PROPS TYPE
type DetailItemProps = {
  place: string;
  resultData: any;
  type: string;
};
type StarScoreProps = {
  max: number;
  rating: number;
};

const StarScore: React.FC<StarScoreProps> = ({ max, rating }) => {
  const rendering = () => {
    const stars = [];
    for (let i = 1; i <= max; i++) {
      const isChecked = i <= rating;
      const color = isChecked ? "#6656ff" : "rgba(0,0,0,0)";
      stars.push(
        <div key={i} className={`mar_lf_5 ${isChecked ? "active" : ""}`}>
          <ScoreIcon key={i} width={14} height={14} color={color} />
        </div>
      );
    }
    return stars;
  };

  return <>{rendering()}</>;
};

const DetailItem: React.FC<DetailItemProps> = ({ resultData, type }) => {
  const [boxWidth, setBoxWidth] = useState<number | undefined>(0);
  const [reviewId, setReviewId] = useState<number>(-1);
  const [commentModal, setCommentModal] = useState<boolean>(false);

  const handleOpenCommentModal = (id: number) => {
    setCommentModal(true);
    setReviewId(id);
  };

  useLayoutEffect(() => {
    let Element = document.querySelector(".review_box");
    setBoxWidth(Element?.clientWidth);
  }, []);
  const likeCount = resultData?.likes;
  return (
    <>
      {resultData !== undefined && resultData.id !== undefined && (
        <>
          <Comment
            isOpen={commentModal}
            setIsOpen={setCommentModal}
            id={reviewId}
            setId={setReviewId}
          />
          <div className="review_item_box" key={resultData?.id}>
            <div className="reviewer_info flex flex_jc_sb flex_ai_fs">
              <div className="user_info flex flex_jc_sb flex_ai_c">
                <ProfileImage src={Logo} alt={""} size={35} />
                <div className="txt_box flex flex_dir_c">
                  <div className="user_nickname">{resultData?.writer}</div>
                  <div className="create_dt">
                    {formattedDate(resultData?.created_at)}
                  </div>
                </div>
              </div>
              {type === "review" ? (
                <div className="review_menu_btn relative">
                  <div className="absolute"></div>
                  <div className="absolute"></div>
                  <div className="absolute"></div>
                </div>
              ) : (
                <Link to={"/detail_review"} state={{ item: resultData }}>
                  <RightArrow />
                </Link>
              )}
            </div>
            <div className="review_box">
              <div className="slider">
                <ImageSlide boxSize={boxWidth} images={resultData?.images} />
              </div>
              <div className="score flex">
                <StarScore max={5} rating={resultData?.score} />
                <p>{resultData?.score}</p>
              </div>
              <div className="contents">{resultData?.content}</div>
              <ul className="hashtag_list flex">
                {resultData?.hashtag?.map((txt: any) => (
                  <li key={txt}>
                    <HashTag tag={txt} />
                  </li>
                ))}
              </ul>
              <div className="icon_box flex flex_ai_c">
                <Like
                  count={likeCount}
                  reviewId={resultData?.id}
                  commentId={null}
                  type={"review"}
                />
                <button
                  className="comment_box flex flex_ai_c"
                  onClick={() => handleOpenCommentModal(resultData?.id)}
                >
                  <CommentIcon />
                  <p>{resultData?.comments}</p>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailItem;
