// LINK
// SVG
import { ReactComponent as MapIcon } from "../../../assets/image/icon/Map-icon.svg";
import { ReactComponent as CompassIcon } from "../../../assets/image/icon/Compass-icon.svg";
import { ReactComponent as WriteIcon } from "../../../assets/image/icon/Review-icon.svg";
import { ReactComponent as BookMarkIcon } from "../../../assets/image/icon/Bookmark-icon.svg";
import { ReactComponent as MyPageIcon } from "../../../assets/image/icon/MyPage-icon.svg";
import { ReactComponent as CameraIcon } from "../../../assets/image/icon/camera_icon.svg";
import { ReactComponent as SettingIcon } from "../../../assets/image/icon/setting_btn.svg";
import { ReactComponent as CloseIcon } from "../../../assets/image/icon/close_btn.svg";
import { ReactComponent as LikeIcon } from "../../../assets/image/icon/like_icon.svg";
import { ReactComponent as ScoreIcon } from "../../../assets/image/icon/Score_star.svg";
import { ReactComponent as DarkMarker } from "../../../assets/image/icon/marker_g.svg";
import { ReactComponent as ColorMarker } from "../../../assets/image/icon/marker_c.svg";
const Section7: React.FC = () => {
  return (
    <div className="pc_section section_7">
      <div className="pc_con">
        <h6 className="section_tit point_txt montserrat">DESIGN CONCEPT</h6>
        <div className="logo_info flex flex_dir_c flex_jc_c flex_ai_c">
          <p>NAMING & LOGO</p>
          <div className="intro_logo_box">
            <img
              src={`${process.env.PUBLIC_URL}/assets/image/intro_logo.svg`}
              alt=""
            />
          </div>
          <div className="logo_explanation flex flex_dir_c flex_jc_c flex_ai_c">
            <p>
              해쉬태그를 이용해 원하는 장소를 등록하고 제한없이 찾을 수 있다는
              의미를 함축적으로 담았으며,
            </p>
            <p>
              <span>Z(지리,지도) + 해쉬태그</span>를 같이 담아 직관적으로
              표현하였다.
            </p>
          </div>
        </div>
        <ul className="use_logo flex flex_jc_sa flex_ai_c">
          <li className="app">
            <div>APP ICON</div>
            <div className="img_box">
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/app_icon.png`}
                alt=""
              />
            </div>
          </li>
          <li className="wordmark">
            <div>WORDMARK</div>
            <div className="img_box">
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/wordmark_logo.png`}
                alt=""
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Section7;
