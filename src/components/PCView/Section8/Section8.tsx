// MODULE
import styled from "styled-components";
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
// STYLED
const SectionStyle = styled.div`
  padding-bottom: 16rem;
  p {
    font-size: 2rem;
    font-weight: 500;
    color: var(--white-color);
  }
  .color_picker {
    flex-basis: 100%;
    margin-top: 20rem;
  }
  .pc_s_con > div:not(.color_picker) {
    margin-top: 13.5rem;
  }
  .color_picker {
    .point_color_bar {
      width: 100%;
      height: 8.4rem;
      margin-top: 3.5rem;
      background: linear-gradient(90deg, #6556ff -3.29%, #461cf4 103.76%);
      &::before {
        content: "6556FF";
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        font-size: 2rem;
        font-weight: 500;
        color: var(--white-color);
      }
      &::after {
        content: "461CF4";
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        font-size: 2rem;
        font-weight: 500;
        color: var(--white-color);
      }
    }
    .normal_color_bar {
      margin-top: 2rem;
      li {
        flex-basis: 100%;
        width: 100%;
        height: 8.4rem;
        &.white {
          flex-basis: 20.06%;
          background: var(--white-color);
          border: 1px solid var(--white-color);
        }
        &.light_gray,
        &.gray {
          flex-basis: 28.93%;
          background: var(--border-color);
          border: 1px solid var(--border-color);
          &.light_gray::before {
            content: "EDEDED";
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            font-size: 2rem;
            font-weight: 500;
            color: var(--white-color);
          }
          &.gray {
            background: var(--disable-color);
            border: 1px solid var(--disable-color);
            &::before {
              content: "959292";
              position: absolute;
              bottom: 1rem;
              right: 1rem;
              font-size: 2rem;
              font-weight: 500;
              color: var(--white-color);
            }
          }
        }
        &.dark_gray {
          flex-basis: calc(100% - 57.92%);
          background: var(--dark-gray-color);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-left: none;
          &::before {
            content: "3A3A3A";
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            font-size: 2rem;
            font-weight: 500;
            color: var(--white-color);
          }
        }
      }
    }
  }
  .typhography {
    flex-basis: 60%;
    ul li {
      font-size: 5rem;
      color: var(--white-color);
      &.montserrat {
        font-weight: 700;
      }
      &.pretendard_semibold {
        font-weight: 700;
      }
      &.pretendard_medium {
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
      }
      &.pretendard_regular {
        font-weight: 400;
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
  .iconography {
    flex-basis: 40%;
    .icon_list {
      flex-basis: 100%;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-basis: calc(100% / 5);
        height: 6rem;
        margin-top: 1rem;
        cursor: pointer;
        svg {
          transition: all 0.3s;
        }
        > div {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-basis: 6rem;
          height: 6rem;
          border-radius: 10px;
          box-shadow: 0 7px 4px rgba(0, 0, 0, 0.25);
        }
        &:hover svg {
          color: var(--point-color);
        }
      }
    }
  }
`;

const Section8: React.FC = () => {
  const handleAddClass = (e: any) => {
    e.currentTarget.classList.add("move_horizon");
  };
  const handleRemoveClass = (e: any) => {
    e.currentTarget.classList.remove("move_horizon");
  };
  return (
    <SectionStyle className="pc_section section_8">
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
    </SectionStyle>
  );
};

export default Section8;
