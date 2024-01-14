// MODULE
import { useRecoilState } from "recoil";
// RECOIL STATE
import { leftMenuState } from "state/userState";
// SVG
import { ReactComponent as CloseBtn } from "../../assets/image/icon/close_btn.svg";
import { ReactComponent as SettingBtn } from "../../assets/image/icon/setting_btn.svg";
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
      </div>
      <div className="middle_section"></div>
      <div className="bottom_section"></div>
    </div>
  );
};
export default LeftMenu;
