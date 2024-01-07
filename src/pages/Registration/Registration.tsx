// MODULE
import { useState, useEffect, ChangeEvent } from "react";
// COMPONENT
import Input from "../../components/Input";
import Header from "../../components/Header";

// PROPS TYPE
type RegistrationProps = {};
const Registration: React.FC<RegistrationProps> = () => {
  const [resEmail, setResEmail] = useState<string>("");
  const [resPassword, setResPassword] = useState<string>("");
  const [resPasswordCheck, setResPasswordCheck] = useState<string>("");
  const [resPhone, setResPhone] = useState<string>("");
  const [resName, setResName] = useState<string>("");
  const [resNickname, setResNickname] = useState<string>("");

  const onChangeRegEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResEmail(e.target.value);
  };
  const onChangeRegPassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResPassword(e.target.value);
  };
  const onChangeRegPasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResPasswordCheck(e.target.value);
  };
  const onChangeRegPhone = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResPhone(e.target.value);
  };
  const onChangeRegName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResName(e.target.value);
  };
  const onChangeRegNickname = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResNickname(e.target.value);
  };
  return (
    <>
      <Header type={3} title={"회원가입"} />
      <div className="res_form_section">
        <Input
          id={"res_email"}
          name={"이메일"}
          value={resEmail}
          onChange={onChangeRegEmail}
          type={"text"}
        />
        <Input
          id={"res_password"}
          name={"비밀번호"}
          value={resPassword}
          onChange={onChangeRegPassword}
          type={"password"}
        />
        <Input
          id={"res_password_check"}
          name={"비밀번호 확인"}
          value={resPasswordCheck}
          onChange={onChangeRegPasswordCheck}
          type={"password"}
        />
        <Input
          id={"res_phone"}
          name={"핸드폰 번호"}
          value={resPhone}
          onChange={onChangeRegPhone}
          type={"text"}
        />
        <Input
          id={"res_name"}
          name={"이름"}
          value={resName}
          onChange={onChangeRegName}
          type={"text"}
        />
        <Input
          id={"res_nickname"}
          name={"닉네임"}
          value={resNickname}
          onChange={onChangeRegNickname}
          type={"text"}
        />
      </div>
    </>
  );
};

export default Registration;
