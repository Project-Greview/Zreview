// MODULE
import { useNavigate, useLocation } from "react-router-dom";
// HOOK
import { getLocationPathname } from "utils/location";
// SVG
import { ReactComponent as HomeIcon } from "../../assets/image/icon/Map-icon.svg";
import { ReactComponent as MyAreaIcon } from "../../assets/image/icon/Compass-icon.svg";
import { ReactComponent as WriteIcon } from "../../assets/image/icon/Review-icon.svg";
import { ReactComponent as BookmarkIcon } from "../../assets/image/icon/Bookmark-icon.svg";
import { ReactComponent as MypageIcon } from "../../assets/image/icon/MyPage-icon.svg";
// RPORS TYPE
type NavigationProps = {};
const Navigation: React.FC<NavigationProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeNum = getLocationPathname(location.pathname);
  return (
    <div className="navigate fixed flex flex_jc_sb flex_ai_c width_100p">
      <ul className="flex flex_jc_sb flex_ai_c width_100p">
        <li
          className={`flex flex_dir_c flex_jc_c flex_ai_c ${
            activeNum === 1 ? "active" : ""
          }`}
          onClick={() => navigate("/main")}
        >
          <HomeIcon color={activeNum === 1 ? "#6656ff" : "#959292"} />
          <p>지도</p>
        </li>
        <li
          className={`flex flex_dir_c flex_jc_c flex_ai_c ${
            activeNum === 2 ? "active" : ""
          }`}
          onClick={() => navigate("/mylocation")}
        >
          <MyAreaIcon color={activeNum === 2 ? "#6656ff" : "#959292"} />
          <p>동네탐색</p>
        </li>
        <li
          className={`flex flex_dir_c flex_jc_c flex_ai_c ${
            activeNum === 3 ? "active" : ""
          }`}
        >
          <WriteIcon color={activeNum === 3 ? "#6656ff" : "#959292"} />
          <p>리뷰쓰기</p>
        </li>
        <li
          className={`flex flex_dir_c flex_jc_c flex_ai_c ${
            activeNum === 4 ? "active" : ""
          }`}
        >
          <BookmarkIcon color={activeNum === 4 ? "#6656ff" : "#959292"} />
          <p>저장목록</p>
        </li>
        <li
          className={`flex flex_dir_c flex_jc_c flex_ai_c ${
            activeNum === 5 ? "active" : ""
          }`}
        >
          <MypageIcon color={activeNum === 5 ? "#6656ff" : "#959292"} />
          <p>마이페이지</p>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
