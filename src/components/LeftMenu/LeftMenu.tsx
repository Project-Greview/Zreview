// MODULE
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
// RECOIL STATE
import { leftMenuState } from "state/userState";
// SVG
import { ReactComponent as CloseBtn } from "../../assets/image/icon/close_btn.svg";
import { ReactComponent as SettingBtn } from "../../assets/image/icon/setting_btn.svg";
import { ReactComponent as MyLocationIcon } from "../../assets/image/icon/Compass-icon.svg";
import { ReactComponent as ReviewIcon } from "../../assets/image/icon/Review-icon.svg";
import { ReactComponent as BookMarkIcon } from "../../assets/image/icon/Bookmark-icon.svg";
import { ReactComponent as ArrowIcon } from "../../assets/image/icon/arrow_right.svg";
// COMPONENT
import ProfileImage from "components/ProfileImage";
// IMAGE
import Logo from "../../assets/image/Logo.png";

const MiddleMenu: React.FC = () => {
  const navigate = useNavigate();
  // STATE
  const [leftMenu, setLeftMenu] = useRecoilState(leftMenuState);
  const handleMovePage = (url: string) => {
    navigate(url);
    setLeftMenu(false);
  };
  return (
    <ul>
      <li
        className="flex flex_jc_sb flex_ai_c"
        onClick={() => handleMovePage("/mylocation")}
      >
        <MyLocationIcon color={"#959292"} />
        <div className="txt flex_flex_jc_s">내 동네 탐색</div>
        <ArrowIcon />
      </li>
      <li
        className="flex flex_jc_sb flex_ai_c"
        onClick={() => handleMovePage("/write")}
      >
        <ReviewIcon color={"#959292"} />
        <div className="txt flex_flex_jc_s">리뷰 쓰기</div>
        <ArrowIcon />
      </li>
      <li
        className="flex flex_jc_sb flex_ai_c"
        onClick={() => handleMovePage("/bookmark")}
      >
        <BookMarkIcon color={"#959292"} />
        <div className="txt flex_flex_jc_s">저장 목록</div>
        <ArrowIcon />
      </li>
    </ul>
  );
};

// PROPS TYPE
type LeftMenuProps = {};
const LeftMenu: React.FC<LeftMenuProps> = () => {
  const navigate = useNavigate();
  // STATE
  const [leftMenu, setLeftMenu] = useRecoilState(leftMenuState);
  // FUNCTION
  const handleCLoseLeftMenu = () => {
    setLeftMenu(false);
  };
  return (
    <div className={`left_menu_section fixed flex flex_dir_c ${leftMenu}`}>
      <div className="top_section">
        <div className="header_section flex flex_jc_sb flex_ai_c">
          <div className="close" onClick={() => handleCLoseLeftMenu()}>
            <CloseBtn />
          </div>
          <div className="setting" onClick={() => navigate("/setting")}>
            <SettingBtn />
          </div>
        </div>
        <div className="my_profile flex flex_dir_c flex_ai_c">
          <ProfileImage src={Logo} alt={"프로필"} size={94} />
          <div className="my_nickname">여기에는 내 닉네임이</div>
          <div className="my_location">여기에는 내 설정지역이</div>
        </div>
        <div className="semi_count">
          <ul className="flex flex_jc_sb flex_ai_c">
            <li>
              <div className="key_tit">리뷰</div>
              <div className="count">00</div>
            </li>
            <li>
              <div className="key_tit">댓글</div>
              <div className="count">00</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="middle_section">
        <MiddleMenu />
      </div>
      <div className="bottom_section">
        <ul>
          <li className="flex flex_ai_c">
            <div>문의하기</div>
          </li>
          <li className="flex flex_jc_sb flex_ai_c">
            <div>버전정보</div>
            <div></div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default LeftMenu;
