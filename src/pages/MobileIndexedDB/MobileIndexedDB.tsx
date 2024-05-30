// MODULE
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// UTIL
import { removeCookie } from "utils/cookies";
import { VolumeCalc } from "utils/distanceCalc";
// COMPONENT
import Modal from "components/Modal";
// SVG
import { ReactComponent as ArrowIcon } from "../../assets/image/icon/arrow_right.svg";
// STYLED
const IndexedDBSettingFrame = styled.div`
  .title {
    font-size: 2.4rem;
  }
`;
const MobileIndexedDB: React.FC = () => {
  const [data, setData] = useState([]);
  const [modalState, setModalState] = useState<number>(0);

  const checkIndexedDBStorage = () => {
    navigator.storage
      .estimate()
      .then((response: any) => {
        setData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleViewIndexedDBVolume = () => {
    checkIndexedDBStorage();
  };
  const handleDeleteIndexedDB = () => {
    indexedDB.deleteDatabase("zreview");
    removeCookie("user");
    removeCookie("UserLat");
    removeCookie("UserLon");
    removeCookie("dummyLocation");
    localStorage.clear();
    setInterval(() => {
      window.location.href = "/";
    }, 1000);
  };
  useEffect(() => {}, []);
  return (
    <>
      {modalState === 1 && (
        <Modal
          type={"type_2"}
          contents={
            "indexedDB를 초기화 하겠습니까?\n 초기화 후 로그인화면으로 이동되며 \n작성된 글, 가입한 계정은 모두 삭제됩니다."
          }
          conform={() => handleDeleteIndexedDB()}
          conform_txt={"초기화"}
          cancel={() => setModalState(0)}
          cancel_txt={"취소"}
        />
      )}
      {modalState === 2 && (
        <Modal
          type={"type_2"}
          contents={
            "indexedDB를 초기화 하겠습니까?\n 초기화 후 로그인화면으로 이동되며 \n작성된 글, 가입한 계정은 모두 삭제됩니다."
          }
          conform={() => setModalState(0)}
          conform_txt={"확인"}
          cancel={undefined}
          cancel_txt={""}
        />
      )}
      <IndexedDBSettingFrame>
        <div className="title flex flex_jc_c flex_ai_c">indexedDB 통계</div>
        <div className="setting_section inner_section">
          <ul>
            <li className="flex flex_jc_sb flex_ai_c">
              <Link
                className="flex"
                to="https://developer.mozilla.org/ko/docs/Web/API/IndexedDB_API"
                target="_blank"
              >
                indexedDB란?
              </Link>
              <ArrowIcon />
            </li>
            <li className="flex flex_jc_sb flex_ai_c">
              <button onClick={() => setModalState(1)}>indexedDB 삭제</button>
              <ArrowIcon />
            </li>
            <li className="flex flex_jc_sb flex_ai_c">
              <button onClick={() => setModalState(2)}>
                indexedDB 사용량 확인
              </button>
              <ArrowIcon />
            </li>
          </ul>
        </div>
      </IndexedDBSettingFrame>
    </>
  );
};

export default MobileIndexedDB;
