// MODULE
import { useState, useEffect, ChangeEvent } from "react";
// HOOK
import { CheckPasswordText, CheckKoreaTextCheck } from "utils/textUtil";
// COMPONENT
import Input from "../../components/Input";
import Header from "../../components/Header";

// PROPS TYPE
type RegistrationProps = {};
const Registration: React.FC<RegistrationProps> = () => {
  const [resEmail, setResEmail] = useState<string>("");
  const [resPassword, setResPassword] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<number>(0);
  const [resPasswordCheck, setResPasswordCheck] = useState<string>("");
  const [pwCkCheck, setPwCkCheck] = useState<number>(0);
  const [resPhone, setResPhone] = useState<string>("");
  const [resName, setResName] = useState<string>("");
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

  return (
    <>
      <Header type={3} title={"회원가입"} />
      <div className="res_form_section">
        <div className="relative width_100p mar_top_20">
          <Input
            id={"res_email"}
            name={"이메일"}
            value={resEmail}
            onChange={onChangeRegEmail}
            type={"text"}
            onBlur={onCheckResEmail}
            maxLength={40}
            placeholder={""}
          />
          <div className="event_txt absolute"></div>
        </div>
        <div className="relative width_100p mar_top_20">
          <Input
            id={"res_password"}
            name={"비밀번호"}
            value={resPassword}
            onChange={onChangeRegPassword}
            type={"password"}
            onBlur={onCheckResPassWord}
            maxLength={16}
            placeholder={""}
          />
          <div className="event_txt absolute"></div>
        </div>
        <div className="relative width_100p mar_top_20">
          <Input
            id={"res_password_check"}
            name={"비밀번호 확인"}
            value={resPasswordCheck}
            onChange={onChangeRegPasswordCheck}
            type={"password"}
            onBlur={onCheckResPasswordCheck}
            maxLength={16}
            placeholder={""}
          />
          <div className="event_txt absolute"></div>
        </div>
        <div className="relative width_100p mar_top_20">
          <Input
            id={"res_phone"}
            name={"핸드폰 번호"}
            value={resPhone}
            onChange={onChangeRegPhone}
            type={"text"}
            onBlur={onCheckResPhone}
            maxLength={11}
            placeholder={""}
          />
          <div className="event_txt absolute"></div>
        </div>
        <div className="relative width_100p mar_top_20">
          <Input
            id={"res_name"}
            name={"이름"}
            value={resName}
            onChange={onChangeRegName}
            type={"text"}
            onBlur={onCheckResName}
            maxLength={10}
            placeholder={""}
          />
          <div className="event_txt absolute"></div>
        </div>
        <div className="relative width_100p mar_top_20">
          <Input
            id={"res_nickname"}
            name={"닉네임"}
            value={resNickname}
            onChange={onChangeRegNickname}
            type={"text"}
            onBlur={onCheckResNickname}
            maxLength={12}
            placeholder={""}
          />
          <div className="event_txt absolute"></div>
        </div>
        <div className={`btn_box absolute flex ${checkValue}`}>
          <div className="buttons flex flex_jc_c flex_ai_c width_100p cursor_p">
            가입하기
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
