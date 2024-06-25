// MODULE
import { useState, ChangeEvent, useEffect } from "react";
// API
import { patchMyProfileFromIndexedDB } from "api/IDBmember";
// HOOK
import { getCookie, setCookie } from "utils/cookies";
// COMPONENT
import Input from "components/Common/Input";
import Button from "components/Common/Button";
import ProfileImage from "components/ProfileImage";
import Header from "components/Header";
import Modal from "components/Modal";
import Setting from "components/MyLocation/Setting/Setting";
// IMAGE
import Logo from "../../assets/image/Logo.png";
const ProfileModify: React.FC = () => {
  // DUMMY
  const getNickname = getCookie("user").nickname;
  const getEmail = getCookie("user").email;
  const getLocation = getCookie("user").location;
  const getLat = getCookie("user").myLatitude;
  const getLon = getCookie("user").myLongitude;

  const [modifyModal, setModifyModal] = useState<number>(0);
  const [modifyData, setModifyData] = useState<any>({
    email: getEmail,
    nickname: getNickname,
    location: getLocation,
    myLatitude: getLat,
    myLongitude: getLon,
  });
  const [locationSetting, setLocationSetting] = useState<boolean>(false);
  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setModifyData((prevState: any) => ({
      ...prevState,
      nickname: e.target.value,
    }));
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setModifyData((prevState: any) => ({
      ...prevState,
      email: e.target.value,
    }));
  };

  const handleStep1ProfileModify = () => {
    setModifyModal(1);
  };

  const PatchMyProfile = async () => {
    try {
      const response: any = await patchMyProfileFromIndexedDB(
        getCookie("user").id,
        modifyData
      );
      if (response.isTrusted) {
        setModifyModal(2);
        const userCookie = getCookie("user");
        if (userCookie) {
          const time = 3600;
          const expiration = new Date(Date.now() + time * 720000);
          let CookiArray = JSON.parse(userCookie);
          CookiArray.nickname = modifyData.nickname;
          CookiArray.location = modifyData.location;
          CookiArray.myLatitude = modifyData.myLatitude;
          CookiArray.myLongitude = modifyData.myLongitude;
          const updatedCookieValue = JSON.stringify(CookiArray);

          setCookie("user", updatedCookieValue, { expires: expiration });
        } else {
          console.log("Cookie not found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      {locationSetting && (
        <Setting
          modalOpen={() => setLocationSetting(false)}
          location={modifyData.location}
          setLocation={(location: string) =>
            setModifyData((prevData: any) => ({ ...prevData, location }))
          }
          myLatitude={modifyData.myLatitude}
          setMyLatitude={(myLatitude: number) =>
            setModifyData((prevData: any) => ({ ...prevData, myLatitude }))
          }
          myLongitude={modifyData.myLongitude}
          setMyLongitude={(myLongitude: number) =>
            setModifyData((prevData: any) => ({ ...prevData, myLongitude }))
          }
        />
      )}
      {modifyModal === 1 ? (
        <Modal
          type={"type_2"}
          contents={"수정하시겠습니까?"}
          conform={() => PatchMyProfile()}
          conform_txt={"확인"}
          cancel={() => setModifyModal(0)}
          cancel_txt={"취소"}
        />
      ) : modifyModal === 2 ? (
        <Modal
          type={"type_2"}
          contents={"수정이 완료되었습니다."}
          conform={() => setModifyModal(0)}
          conform_txt={"확인"}
          cancel={null}
          cancel_txt={""}
        />
      ) : (
        ""
      )}
      <Header type={2} title="프로필수정" />
      <div className="profile_modify_section view_section">
        <div className="modify_img relative flex flex_jc_c">
          <ProfileImage src={Logo} alt={""} size={80} />
        </div>
        <div className="form_section">
          <Input
            id={"nickname"}
            name={"닉네임"}
            value={modifyData.nickname}
            onChange={onChangeNickname}
            type={"text"}
            onBlur={null}
            maxLength={12}
            placeholder={""}
            readonly={false}
            styles={""}
          />
          <Input
            id={"email"}
            name={"이메일"}
            value={modifyData.email}
            onChange={onChangeEmail}
            type={"text"}
            onBlur={null}
            maxLength={40}
            placeholder={""}
            readonly={true}
            styles={""}
          />
          <div className="location_box relative">
            {modifyData.location === "" ? (
              <button
                className={`location_state absolute flex flex_jc_c flex_ai_c`}
                onClick={() => setLocationSetting(true)}
              >
                지역설정
              </button>
            ) : (
              <div
                className={`location_state absolute flex flex_jc_c flex_ai_c`}
              >
                인증완료
              </div>
            )}
            <Input
              id={"myLocation"}
              name={"활동지역"}
              value={modifyData.location}
              onChange={() => console.log("흠")}
              type={"text"}
              onBlur={null}
              maxLength={12}
              placeholder={""}
              readonly={true}
              styles={""}
            />
          </div>
        </div>
        <div className="btn_box absolute flex">
          <Button
            title={"수정하기"}
            event={() => handleStep1ProfileModify()}
            width={"100%"}
            styles={"buttons flex flex_jc_c flex_ai_c width_100p cursor_p"}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileModify;
