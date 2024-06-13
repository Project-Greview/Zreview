// MODULE
import { useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
// RECOIL STATE
import { toastPopupState } from "state/commonState";
// COMPONENT
import Header from "components/Header";
import ImageSlide from "components/ImageSlide";
import HashTag from "components/HashTag";
import ToastPopup from "components/ToastPopup";
// SVG
import { ReactComponent as ScoreIcon } from "../../assets/image/icon/Score_star.svg";
import { ReactComponent as CommentIcon } from "../../assets/image/icon/comment_icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/image/icon/like_icon.svg";
import Comment from "components/Comment";
// PROPS TYPE
type DetailReviewProps = {};
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

const DetailReview: React.FC<DetailReviewProps> = ({}) => {
  const { state } = useLocation();
  const [boxWidth, setBoxWidth] = useState<number | undefined>(0);
  const [commentModal, setCommentModal] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState<number>(-1);
  const [toastModal, setToastModal] = useRecoilState<boolean>(toastPopupState);

  const handleOpenCommentModal = (id: number) => {
    setCommentModal(true);
    setReviewId(id);
  };

  useLayoutEffect(() => {
    let Element = document.querySelector(".review_box");
    setBoxWidth(Element?.clientWidth);
    window.scrollTo(0, 0);
    const element = document.querySelector<HTMLElement>(".detail_frame");
    if (element) {
      element.style.minHeight = "100%";
    }
  }, []);
  return (
    <>
      <Comment
        isOpen={commentModal}
        setIsOpen={setCommentModal}
        id={reviewId}
        setId={setReviewId}
      />
      <ToastPopup popupType={"comment_menu"} ready={toastModal} />
      <div className="inner_section" style={{ background: "#f6f6f6" }}>
        <Header type={2} title={state.item.place_name} />
        <div className="detail_frame">
          <div className="review_item_box">
            <div className="review_box relative">
              <div
                className="menu_btn absolute flex flex_jc_c flex_ai_c"
                onClick={() => setToastModal(true)}
              >
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="slider">
                <ImageSlide boxSize={boxWidth} images={state.item.images} />
              </div>
              <div className="score flex">
                <StarScore max={5} rating={state.item.score} />
                <p>{state.item.score}</p>
              </div>
              <div className="contents">{state.item.content}</div>
              <ul className="hashtag_list flex">
                {state.item.hashtag.map((txt: any) => (
                  <li key={txt}>
                    <HashTag tag={txt} />
                  </li>
                ))}
              </ul>
              <div className="icon_box flex flex_ai_c">
                <div className="like_box flex flex_ai_c">
                  <LikeIcon color={"#e0ddff"} />
                  <p>{state.item.likes}</p>
                </div>
                <button
                  className="comment_box flex flex_ai_c"
                  onClick={() => handleOpenCommentModal(state.item.id)}
                >
                  <CommentIcon />
                  <p>{state.item.comments}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailReview;
