// MODULE
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
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
    // console.log(VolumeCalc(data?.quota));
    setModalState(2);
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
          type={"type_99"}
          contents={`🔋현재 기기에서 부여된 총 indexedDB 용량 : ${VolumeCalc(
            data?.quota
          )}\n\n🪫사용중인 indexedDB 용량 : ${VolumeCalc(
            data?.usageDetails.indexedDB
          )}\n\n✔️indexedDB를 초기화 할 경우 다른 사이트에서도 사용된 indexedDB까지 함께 삭제될 수 있습니다.\nPC의 경우 개발자 환경에서 \n🔹애플리케이션 > indexedDB > zreview🔹\n 에서 데이터베이스 삭제를 진행해주세요!`}
          conform={() => setModalState(0)}
          conform_txt={"확인"}
          cancel={null}
          cancel_txt={""}
        />
      )}
      <IndexedDBSettingFrame>
        <div className="title flex flex_jc_c flex_ai_c">indexedDB 통계</div>
        <div onClick={() => navigate(-1)}>뒤로가기</div>
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
              {/* <button onClick={() => setModalState(2)}> */}
              <button onClick={() => handleViewIndexedDBVolume()}>
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
