// MODULE
import styled from "styled-components";
// COMPONENT
import Button from "components/Common/Button";
// SVG
import { ReactComponent as ArrowLeft } from "../../../assets/image/icon/arrow-left.svg";
// STYLED
const SettingFrame = styled.div`
  width: 100vh;
  height: 100vh;
  background: var(--white-color);
  z-index: 3;
`;
// TYPE
type OptionType = {
  modalOpen: () => void;
  location: string;
  setLocation: (location: string) => void;
  myLatitude: number;
  setMyLatitude: (myLatitude: number) => void;
  myLongitude: number;
  setMyLongitude: (myLongitude: number) => void;
};
const Setting: React.FC<OptionType> = ({
  modalOpen,
  location,
  setLocation,
  myLatitude,
  setMyLatitude,
  myLongitude,
  setMyLongitude,
}) => {
  const handleWritePlacePosition = () => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      let geocoder = new window.kakao.maps.services.Geocoder();
      let callback = function (result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          setLocation(result[0].address_name);
          setMyLatitude(result[0].y);
          setMyLongitude(result[0].x);
        }
      };
      geocoder.coord2RegionCode(
        position.coords.longitude,
        position.coords.latitude,
        callback
      );
    });
    modalOpen();
  };
  return (
    <>
      <div className="modal_bg fixed"></div>
      <div className="option_select_modal fixed">
        <ul className="flex flex_dir_c">
          <li>
            <Button
              title={"현재위치로 설정하기"}
              styles={"buttons"}
              event={() => handleWritePlacePosition()}
              width={"100%"}
            />
          </li>
          <li>
            <Button
              title={"직접 설정하기"}
              styles={"buttons"}
              event={() => alert("방법을 고민중입니다!")}
              width={"100%"}
            />
          </li>
          <li className="round_close_btn flex flex_jc_c flex_ai_c">
            <Button
              title={"X"}
              styles={"buttons absolute flex flex_jc_c flex_ai_c"}
              event={modalOpen}
              width={30}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Setting;
