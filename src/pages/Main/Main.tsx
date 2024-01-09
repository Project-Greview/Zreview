// MODULE

// COMPONENT
import KakaoMap from "../../components/KakaoMap";
import Header from "../../components/Header";

// PROPS TYPE
type MainProps = {};

const Main: React.FC<MainProps> = () => {
  return (
    <>
      <Header type={1} title={""} />
      <KakaoMap />
    </>
  );
};

export default Main;
