// MODULE
import { useRecoilState } from "recoil";
// RECOIL STATE
import { leftMenuState } from "state/userState";
// SVG
import { ReactComponent as CloseBtn } from "../../assets/image/icon/close_btn.svg";
import { ReactComponent as SettingBtn } from "../../assets/image/icon/setting_btn.svg";
import { ReactComponent as MyLocationIcon } from "../../assets/image/icon/Compass-icon.svg";
import { ReactComponent as ReviewIcon } from "../../assets/image/icon/Review-icon.svg";
import { ReactComponent as BookMarkIcon } from "../../assets/image/icon/Bookmark-icon.svg";
import { ReactComponent as ArrowIcon } from "../../assets/image/icon/arrow_right.svg";
// COMPOENT
import ProfileImage from "components/ProfileImage";

const MiddleMenu: React.FC = () => {
  return (
    <ul>
      <li className="flex flex_jc_sb flex_ai_c">
        <MyLocationIcon color={"#959292"} />
        <div>내 동네 탐색</div>
        <ArrowIcon />
      </li>
      <li className="flex flex_jc_sb flex_ai_c">
        <ReviewIcon color={"#959292"} />
        <div>리뷰 쓰기</div>
        <ArrowIcon />
      </li>
      <li className="flex flex_jc_sb flex_ai_c">
        <BookMarkIcon color={"#959292"} />
        <div>저장 목록</div>
        <ArrowIcon />
      </li>
    </ul>
  );
};

// PROPS TYPE
type LeftMenuProps = {};
const LeftMenu: React.FC<LeftMenuProps> = () => {
  // STATE
  const [leftMenu, setLeftMenu] = useRecoilState(leftMenuState);
  // FUNCTION
  const handleCLoseLeftMenu = () => {
    setLeftMenu(false);
  };
  return (
    <div className={`left_menu_section fixed ${leftMenu}`}>
      <div className="top_section">
        <div className="header_section flex flex_jc_sb flex_ai_c">
          <div className="close" onClick={() => handleCLoseLeftMenu()}>
            <CloseBtn />
          </div>
          <div className="setting">
            <SettingBtn />
          </div>
        </div>
        <div className="my_profile flex flex_dir_c flex_ai_c">
          <ProfileImage src={""} alt={"프로필"} size={50} />
          <div className="my_nickname">여기에는 내 닉네임이</div>
          <div className="my_location">여기에는 내 설정지역이</div>
        </div>
      </div>
      <div className="middle_section">
        <MiddleMenu />
      </div>
      <div className="bottom_section"></div>
    </div>
  );
};
export default LeftMenu;
