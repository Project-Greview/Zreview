// MODULE
import { useState, ChangeEvent } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
// HOOK
import { CheckPasswordText } from "utils/textUtil";
import { getCookie } from "utils/cookies";
// COMPONENT
import Input from "../../components/Common/Input";
import Header from "../../components/Header";
import Button from "components/Common/Button";
import Modal from "components/Modal";

// PROPS TYPE
type RegistrationProps = {};

const Registration: React.FC<RegistrationProps> = () => {
  const { state } = useLocation();
  const checkPage = state.type === "modify";

  // 추가로 checkPage 가 true 일 경우 recoil에서 사용자의 개인정보를 가져와 뿌린 후 수정작업 필요
  // DUMMY DATA
  const loginUserEmail = getCookie("dummyEmail");
  const loginUserPhone = getCookie("dummyPhone");
  const loginUserName = getCookie("dummyName");

  const [modifyModal, setModifyModal] = useState<number>(0);
  const [resEmail, setResEmail] = useState<string>(
    checkPage ? loginUserEmail : ""
  );
  const [resPassword, setResPassword] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<number>(0);
  const [resPasswordCheck, setResPasswordCheck] = useState<string>("");
  const [pwCkCheck, setPwCkCheck] = useState<number>(0);
  const [resPhone, setResPhone] = useState<string>(
    checkPage ? loginUserPhone : ""
  );
  const [resName, setResName] = useState<string>(
    checkPage ? loginUserName : ""
  );
  const [nameCheck, setNameCheck] = useState<number>(0);
  const [resNickname, setResNickname] = useState<string>("");
  const [nicknameCheck, setNicknameCheck] = useState<number>(0);

  const onChangeRegEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResEmail(e.target.value);
  };
  const onCheckResEmail = () => {};
  const onChangeRegPassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResPassword(e.target.value);
  };
  const onCheckResPassWord = () => {
    if (CheckPasswordText(resPassword) === true) {
      return setPwCheck(2);
    } else {
      return setPwCheck(1);
    }
  };
  const onChangeRegPasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResPasswordCheck(e.target.value);
  };
  const onCheckResPasswordCheck = () => {
    if (resPassword === resPasswordCheck) {
      return setPwCkCheck(2);
    } else {
      return setPwCkCheck(1);
    }
  };
  const onChangeRegPhone = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 10) {
      value =
        value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7);
    }
    setResPhone(value);
  };
  const onCheckResPhone = () => {};
  const onChangeRegName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResName(e.target.value);
  };
  const onCheckResName = () => {
    if (resName.length < 2) {
      setNameCheck(1);
    } else {
      setNameCheck(2);
    }
  };

  const onChangeRegNickname = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let value = e.target.value.replace(/[^\w\sㄱ-ㅎ가-힣]/g, "");
    setResNickname(value);
  };
  const onCheckResNickname = () => {
    if (resNickname.length < 2) {
      setNicknameCheck(1);
    } else {
      setNicknameCheck(2);
    }
  };
  // REGISTRATION
  const checkValue =
    pwCheck === 2 && pwCkCheck === 2 && nameCheck === 2 && nicknameCheck === 2
      ? ""
      : "disable";

  const handleRegistZreview = () => {};
  // MODIFY
  const handleStep1UsereModify = () => {
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
      <Header type={2} title={checkPage ? "개인정보 수정" : "회원가입"} />
      <div className="res_form_section">
        <div className="relative width_100p mar_top_25">
          <Input
            id={"res_email"}
            name={"이메일"}
            value={resEmail}
            onChange={onChangeRegEmail}
            type={"text"}
            onBlur={onCheckResEmail}
            maxLength={40}
            placeholder={""}
            readonly={false}
          />
          <div className="event_txt absolute"></div>
        </div>
        <div className="relative width_100p mar_top_25">
          <div className="pw_explanation absolute_top">
            8~16자의 영문과 숫자, 특수문자 조합
          </div>
          <Input
            id={"res_password"}
            name={"비밀번호"}
            value={resPassword}
            onChange={onChangeRegPassword}
            type={"password"}
            onBlur={onCheckResPassWord}
            maxLength={16}
            placeholder={""}
            readonly={false}
          />
          <div className="event_txt absolute"></div>
        </div>
        <div className="relative width_100p mar_top_25">
          <div className="pw_explanation absolute_top">
            8~16자의 영문과 숫자, 특수문자 조합
          </div>
          <Input
            id={"res_password_check"}
            name={"비밀번호 확인"}
            value={resPasswordCheck}
            onChange={onChangeRegPasswordCheck}
            type={"password"}
            onBlur={onCheckResPasswordCheck}
            maxLength={16}
            placeholder={""}
            readonly={false}
          />
          <div className="event_txt absolute"></div>
        </div>
        <div className="relative width_100p mar_top_25">
          <Input
            id={"res_phone"}
            name={"핸드폰 번호"}
            value={resPhone}
            onChange={onChangeRegPhone}
            type={"text"}
            onBlur={onCheckResPhone}
            maxLength={11}
            placeholder={""}
            readonly={false}
          />
          <div className="event_txt absolute"></div>
        </div>
        <div className="relative width_100p mar_top_25">
          <Input
            id={"res_name"}
            name={"이름"}
            value={resName}
            onChange={onChangeRegName}
            type={"text"}
            onBlur={onCheckResName}
            maxLength={10}
            placeholder={""}
            readonly={false}
          />
          <div className="event_txt absolute"></div>
        </div>
        {checkPage ? (
          ""
        ) : (
          <div className="relative width_100p mar_top_25">
            <Input
              id={"res_nickname"}
              name={"닉네임"}
              value={resNickname}
              onChange={onChangeRegNickname}
              type={"text"}
              onBlur={onCheckResNickname}
              maxLength={12}
              placeholder={""}
              readonly={false}
            />
            <div className="event_txt absolute"></div>
          </div>
        )}
        <div
          className={`btn_box absolute flex ${!checkPage ? checkValue : ""}`}
        >
          <Button
            title={checkPage ? "수정완료" : "가입하기"}
            event={
              checkPage
                ? () => handleStep1UsereModify()
                : console.log("회원가입 이벤트 작동")
            }
            width={"100%"}
            styles={"buttons flex flex_jc_c flex_ai_c width_100p cursor_p"}
          />
        </div>
      </div>
    </>
  );
};

export default Registration;
