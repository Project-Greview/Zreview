// MODULE
import { useState, useEffect, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// RECOIL STATE
import { shakeAnimationState } from "state/commonState";
// HOOK
import { CheckPasswordText } from "utils/textUtil";
import { getCookie } from "utils/cookies";
import {
  addMemberDataToIndexedDB,
  getCheckMemberEmailDuplicationIndexedDB,
  getCheckMemberPhoneDuplicationIndexedDB,
  getCheckMemberNicknameDuplicationIndexedDB,
} from "api/IDBmember";
// COMPONENT
import Input from "../../components/Common/Input";
import Header from "../../components/Header";
import Button from "components/Common/Button";
import Modal from "components/Modal";

// PROPS TYPE
type RegistrationProps = {};

const Registration: React.FC<RegistrationProps> = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const checkPage = state.type === "modify";

  // 추가로 checkPage 가 true 일 경우 recoil에서 사용자의 개인정보를 가져와 뿌린 후 수정작업 필요
  // DUMMY DATA
  const loginUserEmail = getCookie("dummyEmail");
  const loginUserPhone = getCookie("dummyPhone");
  const loginUserName = getCookie("dummyName");

  const [shake, setShake] = useRecoilState(shakeAnimationState);
  const [modalState, setModalState] = useState<number>(0);
  const [resEmail, setResEmail] = useState<string>(
    checkPage ? loginUserEmail : ""
  );
  const [emailCheck, setEmailCheck] = useState<number>(0);
  const [resPassword, setResPassword] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<number>(0);
  const [resPasswordCheck, setResPasswordCheck] = useState<string>("");
  const [pwCkCheck, setPwCkCheck] = useState<number>(0);
  const [resPhone, setResPhone] = useState<string>(
    checkPage ? loginUserPhone : ""
  );
  const [phoneCheck, setPhoneCheck] = useState<number>(0);
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
  const onCheckResEmail = () => {
    const isTrue = onDuplicationCheckEmail();
    if (resEmail.length < 5) {
      setEmailCheck(1);
      setShake(true);
    } else if (!isTrue) {
      setEmailCheck(2);
      setShake(true);
    } else {
      setEmailCheck(3);
    }
  };
  const onChangeRegPassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResPassword(e.target.value);
  };
  const onCheckResPassWord = () => {
    if (CheckPasswordText(resPassword) === true) {
      setPwCheck(2);
    } else {
      setPwCheck(1);
      setShake(true);
    }
  };
  const onChangeRegPasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResPasswordCheck(e.target.value);
  };
  const onCheckResPasswordCheck = () => {
    if (resPassword !== resPasswordCheck) {
      setPwCkCheck(1);
      setShake(true);
    } else {
      setPwCkCheck(2);
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
  const onCheckResPhone = () => {
    const isTrue = onDuplicationCheckPhone();
    if (resPhone.length < 10) {
      setPhoneCheck(1);
      setShake(true);
    } else if (!isTrue) {
      setPhoneCheck(2);
      setShake(true);
    } else {
      setPhoneCheck(3);
    }
  };
  const onChangeRegName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResName(e.target.value);
  };
  const onCheckResName = () => {
    if (resName.length < 2) {
      setNameCheck(1);
      setShake(true);
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
    const isTrue = onDuplicationCheckNickname();
    if (resNickname.length < 2) {
      setNicknameCheck(1);
      setShake(true);
    } else if (!isTrue) {
      setNicknameCheck(2);
      setShake(true);
    } else {
      setNicknameCheck(3);
    }
  };
  // REGISTRATION

  const checkValue =
    pwCheck === 2 && pwCkCheck === 2 && nameCheck === 3 && nicknameCheck === 3
      ? ""
      : "disable";
  // CHECKING
  const onDuplicationCheckEmail = async () => {
    try {
      const response = await getCheckMemberEmailDuplicationIndexedDB(resEmail);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const onDuplicationCheckPhone = async () => {
    try {
      const response = await getCheckMemberPhoneDuplicationIndexedDB(resPhone);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const onDuplicationCheckNickname = async () => {
    try {
      const response = await getCheckMemberNicknameDuplicationIndexedDB(
        resNickname
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegisterZreview = async () => {
    const postData = {
      email: resEmail,
      password: resPassword,
      phone: resPhone,
      name: resName,
      nickname: resNickname,
    };
    try {
      const response = await addMemberDataToIndexedDB(postData);
      console.log(response);
      if (response === "success") {
        setModalState(3);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // MODIFY
  const handleStep1UsereModify = () => {
    setModalState(1);
  };
  useEffect(() => {
    setTimeout(() => {
      setShake(false);
    }, 1000);
  }, [shake]);
  return (
    <>
      {modalState === 1 ? (
        <Modal
          type={"type_2"}
          contents={"수정하시겠습니까?"}
          conform={() => (
            console.log(
              "여기에는 수정 API를 태우세요. 끝에는 setModalState(2)"
            ),
            setModalState(2)
          )}
          conform_txt={"확인"}
          cancel={() => setModalState(0)}
          cancel_txt={"취소"}
        />
      ) : modalState === 2 ? (
        <Modal
          type={"type_2"}
          contents={"수정이 완료되었습니다."}
          conform={() => setModalState(0)}
          conform_txt={"확인"}
          cancel={null}
          cancel_txt={""}
        />
      ) : modalState === 3 ? (
        <Modal
          type={"type_2"}
          contents={"회원가입이 완료되었습니다!"}
          conform={() => (setModalState(0), navigate("/"))}
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
            onBlur={checkPage ? undefined : onCheckResEmail}
            maxLength={40}
            placeholder={""}
            readonly={false}
            styles={""}
          />
          <div
            className={`event_txt absolute ${shake ? "shake_rotate" : ""} ${
              emailCheck === 3
            }`}
          >
            {emailCheck === 1
              ? "올바른 이메일 주소를 입력해주세요."
              : emailCheck === 2
              ? "중복된 이메일 입니다."
              : emailCheck === 3
              ? "사용 가능한 이메일 입니다."
              : ""}
          </div>
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
            styles={""}
          />
          <div
            className={`event_txt absolute ${shake ? "shake_rotate" : ""} ${
              pwCheck === 2
            }`}
          >
            {pwCheck === 1 ? "비밀번호를 확인해주세요." : ""}
          </div>
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
            styles={""}
          />
          <div
            className={`event_txt absolute ${shake ? "shake_rotate" : ""} ${
              pwCkCheck === 2
            }`}
          >
            {pwCkCheck === 1 ? "입력한 비밀번호가 다릅니다." : ""}
          </div>
        </div>
        <div className="relative width_100p mar_top_25">
          <Input
            id={"res_phone"}
            name={"핸드폰 번호"}
            value={resPhone}
            onChange={onChangeRegPhone}
            type={"text"}
            onBlur={checkPage ? undefined : onCheckResPhone}
            maxLength={11}
            placeholder={""}
            readonly={false}
            styles={""}
          />
          <div
            className={`event_txt absolute ${shake ? "shake_rotate" : ""} ${
              phoneCheck === 3
            }`}
          >
            {phoneCheck === 1
              ? "올바른 전화번호를 입력해주세요."
              : phoneCheck === 2
              ? "가입된 전화번호 입니다."
              : phoneCheck === 3
              ? "사용 가능한 전화번호 입니다."
              : ""}
          </div>
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
            styles={""}
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
              onBlur={checkPage ? undefined : onCheckResNickname}
              maxLength={12}
              placeholder={""}
              readonly={false}
              styles={""}
            />
            <div
              className={`event_txt absolute ${shake ? "shake_rotate" : ""} ${
                nicknameCheck === 3
              }`}
            >
              {nicknameCheck === 1
                ? "올바른 닉네임을 입력해주세요."
                : nicknameCheck === 2
                ? "중복된 닉네임 입니다."
                : nicknameCheck === 3
                ? "사용 가능한 닉네임 입니다."
                : ""}
            </div>
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
                : () => handleRegisterZreview()
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
