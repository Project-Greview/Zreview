// MODULE
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
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

const DetailItem: React.FC = () => {
  const { state } = useLocation();
  // 임시 데이터용
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
  return (
    <li className="review_item_box">
      <div className="reviewer_info flex flex_jc_sb flex_ai_fs">
        <div className="user_info flex flex_jc_sb flex_ai_c">
          <ProfileImage src={Logo} alt={""} size={35} />
          <div className="txt_box flex flex_dir_c">
            <div className="user_nickname">{getDummyData[0].member}</div>
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
          <ImageSlide />
        </div>
        <div className="score flex">
          <StarScore max={5} rating={getDummyData[0].rating} />
          <p>{getDummyData[0].rating}</p>
        </div>
        <div className="contents">{getDummyData[0].content}</div>
        <ul className="hashtag_list flex">
          {getDummyData[0].hashtag.map((txt) => (
            <li key={txt}>
              <HashTag tag={txt} />
            </li>
          ))}
        </ul>
        <div className="icon_box flex flex_ai_c">
          <div className="like_box flex flex_ai_c">
            <LikeIcon />
            <p>{getDummyData[0].likes}</p>
          </div>
          <div className="comment_box flex flex_ai_c">
            <CommentIcon />
            <p>{getDummyData[0].comments}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default DetailItem;
