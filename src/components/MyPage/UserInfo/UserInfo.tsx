// MODULE
import { useNavigate } from "react-router-dom";
// HOOK
import { getCookie } from "utils/cookies";
// UTIL
import { extractNeighborhoodType } from "utils/location";
// COMPONENT
import ProfileImage from "components/ProfileImage";
// IMAGE
import Logo from "../../../assets/image/Logo.png";
import Button from "components/Common/Button";
// PROPS TYPE
type UserInfoProps = {};

const UserInfo: React.FC<UserInfoProps> = () => {
  const navigate = useNavigate();
  // DUMMY
  const getNickname = getCookie("user").nickname;
  const getSettingLocation = getCookie("user").location;

  return (
    <>
      <div className="my_profile flex flex_jc_s flex_ai_c">
        <ProfileImage src={Logo} alt={"프로필"} size={80} />
        <div className="flex flex_dir_c">
          <div className="my_nickname">{getNickname}</div>
          <div className="my_location">
            {extractNeighborhoodType(getSettingLocation)}
          </div>
        </div>
      </div>
      <div className="btn_box flex">
        <Button
          title={"프로필 수정"}
          event={() => navigate("/profile-modify")}
          width={"100%"}
          styles={"buttons flex flex_jc_c flex_ai_c width_100p cursor_p"}
        />
      </div>
    </>
  );
};

export default UserInfo;
