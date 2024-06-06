// MODULE
import styled from "styled-components";
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
type SettingType = {
  close: () => void;
};

const Setting: React.FC<SettingType> = ({ close }) => {
  return (
    <SettingFrame className="fixed flex">
      <button onClick={close}>
        <ArrowLeft />
      </button>
      <div>내 지역 설정하기</div>
    </SettingFrame>
  );
};

export default Setting;
