// MODULE
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
// RECOIL STATE
import { dummyModalState } from "state/dummyState";
// COMPONENT
import Modal from "components/Modal";
// JSON
import menuList from "../../json/settingMenu.json";
// SVG
import { ReactComponent as ArrowIcon } from "../../assets/image/icon/arrow_right.svg";
import { useState } from "react";
import { removeCookie } from "utils/cookies";

const Setting: React.FC = () => {
  const navigate = useNavigate();
  const [productModal, setProductModal] =
    useRecoilState<Boolean>(dummyModalState);
  const [modalState, setModalState] = useState<number>(0);
  const logout_event = () => {
    removeCookie("user");
    window.location.href = `${
      process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : "/"
    }`;
  };
  return (
    <>
      {modalState === 1 ? (
        <Modal
          type={"type_2"}
          contents={"로그아웃 하시겠어요?"}
          conform={() => logout_event()}
          conform_txt={"확인"}
          cancel={() => setModalState(0)}
          cancel_txt={"취소"}
        />
      ) : modalState === 2 ? (
        ""
      ) : (
        ""
      )}
      <div className="setting_section inner_section">
        <ul>
          {menuList.top_menu.map((item) => (
            <li
              key={item.name}
              className="flex flex_jc_sb flex_ai_c"
              onClick={() =>
                item.event !== ""
                  ? console.log("aaaa")
                  : navigate(`${item.url}`, {
                      state: {
                        type: item.url === "/user-modify" ? "modify" : "normal",
                      },
                    })
              }
            >
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
            <li
              key={item.name}
              className="flex flex_jc_sb flex_ai_c"
              onClick={() =>
                item.event === "logout_event"
                  ? setModalState(1)
                  : navigate(`${item.url}`)
              }
            >
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
        {isMobile && process.env.PUBLIC_URL && (
          <>
            <div className="flex flex_jc_c flex_ai_c">⬇️임시 메뉴⬇️</div>
            <ul>
              <li
                onClick={() => setProductModal(true)}
                className="flex flex_jc_sb flex_ai_c"
              >
                <div>모바일용 더미데이터 생성하기</div>
                <div>
                  <ArrowIcon />
                </div>
              </li>
              <li
                onClick={() => navigate("/indexedDB-setting")}
                className="flex flex_jc_sb flex_ai_c"
              >
                <div>indexedDB 관리 메뉴</div>
                <div>
                  <ArrowIcon />
                </div>
              </li>
              <li
                className="flex flex_jc_sb flex_ai_c"
                onClick={() => navigate("/Dummy_List")}
              >
                <div>임시데이터 목록 보기</div>
                <div>
                  <ArrowIcon />
                </div>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Setting;
