// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
// HOOK\
import { getAllTargetDataFromIndexedDB } from "api/IDBreview";
// RECOIL STATE
import { dummyDateState } from "state/dummyState";
// COMPONENT
import ProfileImage from "components/ProfileImage";
import HashTag from "components/HashTag";
// IMAGE
import Logo from "../../assets/image/Logo.png";
// SVG
import { ReactComponent as ScoreIcon } from "../../assets/image/icon/Score_star.svg";
import { ReactComponent as CommentIcon } from "../../assets/image/icon/comment_icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/image/icon/like_icon.svg";
import ImageSlide from "components/ImageSlide";
// PROPS TYPE
type DetailItemProps = {
  place: string;
};
type StarScoreProps = {
  max: number;
  rating: number;
};
interface ReviewDataType {
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
}
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

const DetailItem: React.FC<DetailItemProps> = ({ place }) => {
  const { state } = useLocation();
  const [boxWidth, setBoxWidth] = useState<number | undefined>(0);
  const [reviewData, setReviewData] = useState<ReviewDataType | any>([]);
  // 임시 데이터
  const dummyData = useRecoilState(dummyDateState);
  const getDummyData = dummyData[0].filter(
    (dummyItem) => dummyItem.id === state
  );
  const formattedDate = new Date(
    getDummyData[0]?.updated_at
  ).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // 임시 데이터

  useLayoutEffect(() => {
    let Element = document.querySelector(".review_box");
    setBoxWidth(Element?.clientWidth);
  }, []);
  useLayoutEffect(() => {
    getAllTargetDataFromIndexedDB(place)
      .then((data) => {
        setReviewData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);
  // console.log("reviewData", reviewData);
  return (
    <ul>
      {reviewData.map((item: any) => (
        <li className="review_item_box" key={item?.id}>
          <div className="reviewer_info flex flex_jc_sb flex_ai_fs">
            <div className="user_info flex flex_jc_sb flex_ai_c">
              <ProfileImage src={Logo} alt={""} size={35} />
              <div className="txt_box flex flex_dir_c">
                <div className="user_nickname">{item?.writer}</div>
                <div className="create_dt">{formattedDate}</div>
              </div>
            </div>
            <div className="review_menu_btn relative">
              <div className="absolute"></div>
              <div className="absolute"></div>
              <div className="absolute"></div>
            </div>
          </div>
          <div className="review_box">
            <div className="slider">
              <ImageSlide boxSize={boxWidth} images={item?.images} />
            </div>
            <div className="score flex">
              <StarScore max={5} rating={item?.rating} />
              <p>{item?.rating}</p>
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
      ))}
    </ul>
  );
};

export default DetailItem;
