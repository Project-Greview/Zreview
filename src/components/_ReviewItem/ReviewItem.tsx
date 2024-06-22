// MODULE
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
// COMPONENT
import ProfileImage from "components/ProfileImage";
import HashTag from "components/HashTag";
import ImageSlide from "components/ImageSlide";
// UTIL
import { formattedDate } from "utils/dateCalc";
// IMAGE
import Logo from "../../assets/image/Logo.png";
// SVG
import { ReactComponent as ScoreIcon } from "../../assets/image/icon/Score_star.svg";
import { ReactComponent as CommentIcon } from "../../assets/image/icon/comment_icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/image/icon/like_icon.svg";
import { ReactComponent as RightArrow } from "../../assets/image/icon/arrow_right.svg";
// PROPS TYPE
type ReviewItemProps = {
  data: any;
};
type StarScoreProps = {
  max: number;
  rating: number;
};
type ItemType = {
  id: number;
  comments: number;
  content: string;
  created_at: Date;
  hashtag: string[];
  images: string[];
  likes: number;
  location_lat: number;
  location_lon: number;
  member: undefined | string;
  place_address: string;
  place_name: string;
  profile: string;
  score: number;
  views: number;
  writer: string;
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

const ReviewItem: React.FC<ReviewItemProps> = ({ data }) => {
  const [boxWidth, setBoxWidth] = useState<number | undefined>(0);
  useLayoutEffect(() => {
    let Element = document.querySelector(".review_box");
    setBoxWidth(Element?.clientWidth);
  }, []);
  console.log("data : ", data);
  return (
    <ul>
      {data.map((item: ItemType) => {
        return (
          <li className="review_item_box" key={item.id}>
            <div className="reviewer_info flex flex_jc_sb flex_ai_fs">
              <div className="user_info flex flex_jc_sb flex_ai_c">
                <ProfileImage src={Logo} alt={""} size={35} />
                <div className="txt_box flex flex_dir_c">
                  <div className="user_nickname">{item?.writer}</div>
                  <div className="create_dt">
                    {formattedDate(item?.created_at)}
                  </div>
                </div>
              </div>
              {/* <div className="review_menu_btn relative">
                <div className="absolute"></div>
                <div className="absolute"></div>
                <div className="absolute"></div>
              </div> */}
              <Link to={"/detail_review"} state={{ item: item }}>
                <RightArrow />
              </Link>
            </div>
            <div className="review_box">
              <div className="slider">
                <ImageSlide boxSize={boxWidth} images={item?.images} />
              </div>
              <div className="score flex">
                <StarScore max={5} rating={item?.score} />
                <p>{item?.score}</p>
              </div>
              <div className="contents">{item?.content}</div>
              <ul className="hashtag_list flex">
                {item?.hashtag.map((txt: any) => (
                  <li key={txt}>
                    <HashTag tag={txt} />
                  </li>
                ))}
              </ul>
              <div className="icon_box flex flex_ai_c">
                <div className="like_box flex flex_ai_c">
                  <LikeIcon color={"#e0ddff"} />
                  <p>{item?.likes}</p>
                </div>
                <div className="comment_box flex flex_ai_c">
                  <CommentIcon />
                  <p>{item?.comments}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewItem;
