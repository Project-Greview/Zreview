// MODULE
// HOOK
// SVG
import { ReactComponent as MapIcon } from "../../../assets/image/icon/Map-icon.svg";
import { ReactComponent as CompassIcon } from "../../../assets/image/icon/Compass-icon.svg";
import { ReactComponent as WriteIcon } from "../../../assets/image/icon/Review-icon.svg";
import { ReactComponent as BookMarkIcon } from "../../../assets/image/icon/Bookmark-icon.svg";
import { ReactComponent as MyPageIcon } from "../../../assets/image/icon/MyPage-icon.svg";
import { ReactComponent as CameraIcon } from "../../../assets/image/icon/camera_icon.svg";
import { ReactComponent as SettingIcon } from "../../../assets/image/icon/setting_btn.svg";
import { ReactComponent as CloseIcon } from "../../../assets/image/icon/close_btn.svg";
import { ReactComponent as LikeIcon } from "../../../assets/image/icon/like_icon.svg";
import { ReactComponent as ScoreIcon } from "../../../assets/image/icon/Score_star.svg";
import { ReactComponent as DarkMarker } from "../../../assets/image/icon/marker_g.svg";
import { ReactComponent as ColorMarker } from "../../../assets/image/icon/marker_c.svg";

const Section8: React.FC = () => {
  const handleAddClass = (e: any) => {
    e.currentTarget.classList.add("move_horizon");
  };
  const handleRemoveClass = (e: any) => {
    e.currentTarget.classList.remove("move_horizon");
  };
  return (
    <div className="pc_section section_8">
      <div className="pc_s_con flex flex_jc_sb flex_wrap_wrap">
        <div className="color_picker">
          <p>COLOR SYSTEM</p>
          <div className="point_color_bar relative"></div>
          <ul className="normal_color_bar flex">
            <li className="white relative"></li>
            <li className="light_gray relative"></li>
            <li className="gray relative"></li>
            <li className="dark_gray relative"></li>
          </ul>
        </div>
        <div className="typhography">
          <p>TYPHOGRAPHY</p>
          <ul>
            <li
              className="montserrat"
              onMouseEnter={(e) => handleAddClass(e)}
              onMouseLeave={(e) => handleRemoveClass(e)}
            >
              Montserrat Bold
            </li>
            <li
              className="pretendard_semibold"
              onMouseEnter={(e) => handleAddClass(e)}
              onMouseLeave={(e) => handleRemoveClass(e)}
            >
              프리텐다드 Semibold
            </li>
            <li
              className="pretendard_medium"
              onMouseEnter={(e) => handleAddClass(e)}
              onMouseLeave={(e) => handleRemoveClass(e)}
            >
              프리텐다드 Medium
            </li>
            <li
              className="pretendard_regular"
              onMouseEnter={(e) => handleAddClass(e)}
              onMouseLeave={(e) => handleRemoveClass(e)}
            >
              프리텐다드 Regular
            </li>
          </ul>
        </div>
        <div className="iconography">
          <p>ICONOGRAPHY</p>
          <ul className="icon_list flex flex_jc_s flex_ai_c flex_wrap_wrap">
            <li>
              <div
                onMouseEnter={(e) => handleAddClass(e)}
                onMouseLeave={(e) => handleRemoveClass(e)}
              >
                <MapIcon color="#ffffff" />
              </div>
            </li>
            <li>
              <div
                onMouseEnter={(e) => handleAddClass(e)}
                onMouseLeave={(e) => handleRemoveClass(e)}
              >
                <CompassIcon color="#ffffff" />
              </div>
            </li>
            <li>
              <div
                onMouseEnter={(e) => handleAddClass(e)}
                onMouseLeave={(e) => handleRemoveClass(e)}
              >
                <WriteIcon color="#ffffff" />
              </div>
            </li>
            <li>
              <div
                onMouseEnter={(e) => handleAddClass(e)}
                onMouseLeave={(e) => handleRemoveClass(e)}
              >
                <BookMarkIcon color="#ffffff" />
              </div>
            </li>
            <li>
              <div
                onMouseEnter={(e) => handleAddClass(e)}
                onMouseLeave={(e) => handleRemoveClass(e)}
              >
                <MyPageIcon color="#ffffff" />
              </div>
            </li>
            <li>
              <div
                onMouseEnter={(e) => handleAddClass(e)}
                onMouseLeave={(e) => handleRemoveClass(e)}
              >
                <CameraIcon color="#ffffff" />
              </div>
            </li>

            <li>
              <div
                onMouseEnter={(e) => handleAddClass(e)}
                onMouseLeave={(e) => handleRemoveClass(e)}
              >
                <SettingIcon color="#ffffff" />
              </div>
            </li>
            <li>
              <div
                onMouseEnter={(e) => handleAddClass(e)}
                onMouseLeave={(e) => handleRemoveClass(e)}
              >
                <CloseIcon color="#ffffff" />
              </div>
            </li>
            <li>
              <div
                onMouseEnter={(e) => handleAddClass(e)}
                onMouseLeave={(e) => handleRemoveClass(e)}
              >
                <LikeIcon color="#ffffff" />
              </div>
            </li>
            <li>
              <div
                onMouseEnter={(e) => handleAddClass(e)}
                onMouseLeave={(e) => handleRemoveClass(e)}
              >
                <ScoreIcon color="#ffffff" />
              </div>
            </li>
            <li>
              <div
                onMouseEnter={(e) => handleAddClass(e)}
                onMouseLeave={(e) => handleRemoveClass(e)}
              >
                <DarkMarker color="#ffffff" />
              </div>
            </li>
            <li>
              <div
                onMouseEnter={(e) => handleAddClass(e)}
                onMouseLeave={(e) => handleRemoveClass(e)}
              >
                <ColorMarker color="#ffffff" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Section8;
