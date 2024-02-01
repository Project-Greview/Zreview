// MODULE
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// RECOIL STAET
import { leftMenuState } from "state/userState";
// SVG
import { ReactComponent as ArrowLeft } from "../../assets/image/icon/arrow-left.svg";
import { ReactComponent as SettingIcon } from "../../assets/image/icon/setting_btn.svg";
// COMPONENT
import SearchInput from "../../components/SearchInput";
// PROPS TYPE
type HeaderProps = {
  type: number;
  title: string;
};

const Header: React.FC<HeaderProps> = ({ type, title }) => {
  const navigate = useNavigate();
  // STATE
  const [leftMenu, setLeftMenu] = useRecoilState(leftMenuState);
  // FUNCTION
  const handleOpenLeftMenu = () => {
    setLeftMenu(true);
  };

  return (
    <div className={`header fixed width_100p`}>
      {type === 1 ? (
        <div className="main flex flex_jc_sb flex_ai_c">
          <div
            className="bars_menu relative"
            onClick={() => handleOpenLeftMenu()}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          <SearchInput searchType={"double"} />
        </div>
      ) : type === 2 ? (
        <div className="review flex flex_jc_sb flex_ai_c">
          <div className="back_btn flex flex_ai_c" onClick={() => navigate(-1)}>
            <ArrowLeft color={"#3a3a3a"} />
          </div>
          <div className="page_title flex flex_jc_c flex_ai_c">{title}</div>
        </div>
      ) : type === 3 ? (
        <div className="mylocation flex flex_jc_sb flex_ai_c">
          <div className="back_btn flex flex_ai_c" onClick={() => navigate(-1)}>
            <ArrowLeft color={"#3a3a3a"} />
          </div>
          <SearchInput searchType={"single"} />
        </div>
      ) : type === 4 ? (
        <div className="mypage flex flex_jc_sb flex_ai_c">
          <div className="back_btn flex flex_ai_c" onClick={() => navigate(-1)}>
            <ArrowLeft color={"#3a3a3a"} />
          </div>
          <div className="page_title flex flex_jc_c flex_ai_c">{title}</div>
          <div className="setting_btn" onClick={() => navigate("/setting")}>
            <SettingIcon />
          </div>
        </div>
      ) : (
        <div
          className="flex flex_jc_sb flex_ai_c"
          style={{ boxShadow: "0 0.5rem 1rem #eeeeee" }}
        >
          <div className="back_btn flex flex_ai_c" onClick={() => navigate(-1)}>
            <ArrowLeft color={"#3a3a3a"} />
          </div>
          <div className="page_title flex flex_jc_c flex_ai_c">{title}</div>
        </div>
      )}
    </div>
  );
};

export default Header;
