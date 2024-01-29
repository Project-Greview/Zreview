// MODULE

// COMPONENT
import HashTag from "components/HashTag";
import MyLocationMap from "components/MyLocation/MyLocationMap";
import SomenailItem from "components/SomenailItem";
// PROPS TYPE
type MyLocationProps = {};

const MyLocation: React.FC<MyLocationProps> = () => {
  return (
    <div className="my_location_section view_section">
      <div className="sub_section">
        <p className="sub_tit">현재 접속한 동네 이름 표시</p>
        <MyLocationMap />
      </div>
      <div className="sub_section">
        <p className="sub_tit">우리동네 Best 태그</p>
        <ul className="hashtag_list flex flex_jc_s flex_ai_c">
          <li>
            <HashTag tag={"맛집"} />
          </li>
        </ul>
      </div>
      <div className="sub_section">
        <p className="sub_tit">우리동네 실시간 리뷰</p>
        <ul>
          <SomenailItem type={"empty"} data={null} />
        </ul>
      </div>
    </div>
  );
};

export default MyLocation;
