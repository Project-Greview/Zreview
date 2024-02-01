// MODULE
import { useState, useEffect, ChangeEvent } from "react";
// COMPONENT
import Input from "components/Common/Input";
import Button from "components/Common/Button";
import ProfileImage from "components/ProfileImage";
import Header from "components/Header";
import Modal from "components/Modal";
// IMAGE
import Logo from "../../assets/image/Logo.png";
const ProfileModify: React.FC = () => {
  const [modifyModal, setModifyModal] = useState<number>(0);
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [myLocation, setMyLocation] = useState<string>("");

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNickname(e.target.value);
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleStep1ProfileModify = () => {
    setModifyModal(1);
  };
  return (
    <>
      {modifyModal === 1 ? (
        <Modal
          type={"type_2"}
          contents={"수정하시겠습니까?"}
          conform={() => (
            console.log(
              "여기에는 수정 API를 태우세요. 끝에는 setModifyModal(2)"
            ),
            setModifyModal(2)
          )}
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
            value={nickname}
            onChange={onChangeNickname}
            type={"text"}
            onBlur={null}
            maxLength={12}
            placeholder={""}
            readonly={false}
          />
          <Input
            id={"email"}
            name={"이메일"}
            value={email}
            onChange={onChangeEmail}
            type={"text"}
            onBlur={null}
            maxLength={40}
            placeholder={""}
            readonly={true}
          />
          <div className="location_box relative">
            <div className={`location_state absolute flex flex_jc_c flex_ai_c`}>
              인증완료
            </div>
            <Input
              id={"myLocation"}
              name={"활동지역"}
              value={myLocation}
              onChange={() => console.log("흠")}
              type={"text"}
              onBlur={null}
              maxLength={12}
              placeholder={""}
              readonly={true}
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
