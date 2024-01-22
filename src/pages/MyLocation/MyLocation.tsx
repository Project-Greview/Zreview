// MODULE

// COMPONENT
import MyLocationMap from "components/MyLocation/MyLocationMap";
// PROPS TYPE
type MyLocationProps = {};

const MyLocation: React.FC<MyLocationProps> = () => {
  return (
    <div className="my_location_section">
      <div className="sub_section">
        <p className="sub_tit">현재 접속한 동네 이름 표시</p>
        <MyLocationMap />
      </div>
      <div className="sub_section">
        <p className="sub_tit">우리동네 Best 태그</p>
      </div>
      <div className="sub_section">
        <p className="sub_tit">우리동네 실시간 리뷰</p>
      </div>
    </div>
  );
};

export default MyLocation;
