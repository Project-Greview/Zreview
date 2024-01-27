// MODULE
import { useRecoilState } from "recoil";
import { isMobile } from "react-device-detect";
// RECOIL STATE
import { dummyModalState } from "state/dummyState";
// JSON
import menuList from "../../json/settingMenu.json";
// SVG
import { ReactComponent as ArrowIcon } from "../../assets/image/icon/arrow_right.svg";

const Setting: React.FC = () => {
  const [productModal, setProductModal] =
    useRecoilState<Boolean>(dummyModalState);

  return (
    <div className="setting_section inner_section">
      <ul>
        {menuList.top_menu.map((item) => (
          <li key={item.name} className="flex flex_jc_sb flex_ai_c">
            <div>{item.name}</div>
            {item.sub === "" ? (
              ""
            ) : item.sub === "arrow" ? (
              <ArrowIcon />
            ) : (
              <div>{item.sub}</div>
            )}
          </li>
        ))}
      </ul>
      <ul>
        {menuList.bottom_menu.map((item) => (
          <li key={item.name} className="flex flex_jc_sb flex_ai_c">
            <div>{item.name}</div>
            {item.sub === "" ? (
              ""
            ) : item.sub === "arrow" ? (
              <ArrowIcon />
            ) : (
              <div>{item.sub}</div>
            )}
          </li>
        ))}
        {isMobile ? (
          <li
            onClick={() => setProductModal(true)}
            className="flex flex_jc_sb flex_ai_c"
          >
            <div>모바일용 더미데이터 생성하기</div>
            <div>
              <ArrowIcon />
            </div>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default Setting;
