// MODULE

// HOOK
import { getCookie } from "utils/cookies";
// COMPONENT
import HashTag from "components/HashTag";
import MyLocationMap from "components/MyLocation/MyLocationMap";
import ThumbnailItem from "components/ThumbnailItem";
// PROPS TYPE
type MyLocationProps = {};

const MyLocation: React.FC<MyLocationProps> = () => {
  const dummyLocation = getCookie("dummyLocation");
  return (
    <div className="my_location_section view_section">
      <div className="sub_section">
        <p className="sub_tit">{dummyLocation}</p>
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
          <ThumbnailItem type={"empty"} data={null} />
        </ul>
      </div>
    </div>
  );
};

export default MyLocation;
