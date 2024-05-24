// MODULE
import { useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
// CONPONENT
import Header from "components/Header";
import DetailItem from "components/DetailItem";
import ImageSlide from "components/ImageSlide";
import HashTag from "components/HashTag";
// SVG
import { ReactComponent as ScoreIcon } from "../../assets/image/icon/Score_star.svg";
import { ReactComponent as CommentIcon } from "../../assets/image/icon/comment_icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/image/icon/like_icon.svg";
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
  console.log(state);
  const [boxWidth, setBoxWidth] = useState<number | undefined>(0);
  useLayoutEffect(() => {
    let Element = document.querySelector(".review_box");
    setBoxWidth(Element?.clientWidth);
  }, []);
  return (
    <div className="inner_section" style={{ background: "#f6f6f6" }}>
      <Header type={2} title={state.item.place_name} />
      <div className="detail_frame">
        <div className="review_box">
          <div className="slider">
            <ImageSlide boxSize={boxWidth} images={state.item.images} />
          </div>
          <div className="score flex">
            <StarScore max={5} rating={state.item.score} />
            <p>{state.item.score}</p>
          </div>
          <div className="contents">{state.item.content}</div>
        </div>
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
          <div className="comment_box flex flex_ai_c">
            <CommentIcon />
            <p>{state.item.comments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailReview;
