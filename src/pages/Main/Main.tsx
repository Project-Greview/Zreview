// MODULE
import { useRecoilValue } from "recoil";
// RECOIL STAET
import { leftMenuState } from "state/userState";
// COMPONENT
import LeftMenu from "../../components/LeftMenu";
import KakaoMap from "../../components/KakaoMap";

// PROPS TYPE
type MainProps = {};

const Main: React.FC<MainProps> = () => {
  const isLeftMenu = useRecoilValue(leftMenuState);
  return (
    <>
      <LeftMenu />
      <div className={`bg_section fixed ${isLeftMenu}`}></div>
      <KakaoMap />
    </>
  );
};

export default Main;
