// MODULE
import { useState, ChangeEvent } from "react";
import { useRecoilState } from "recoil";
// HOOK
import { CheckPasswordText } from "utils/textUtil";
// RECOIL STATE
import { shakeAnimationState } from "state/commonState";
// COMPONENT
import Input from "components/Common/Input";
// PROPS TYPE
type PasswordType = {
  password: string;
  setPassword: any;
  check: number;
  setCheck: any;
};

const Password: React.FC<PasswordType> = ({
  password,
  setPassword,
  check,
  setCheck,
}) => {
  const [shake, setShake] = useRecoilState(shakeAnimationState);
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [pwCkCheck, setPwCkCheck] = useState<number>(0);

  const onChangeRegPassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const onCheckResPassWord = () => {
    if (CheckPasswordText(password) === true) {
      setCheck(2);
    } else {
      setCheck(1);
      setShake(true);
    }
  };
  const onChangeRegPasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPasswordCheck(e.target.value);
  };
  const onCheckResPasswordCheck = () => {
    if (password !== passwordCheck) {
      setPwCkCheck(1);
      setShake(true);
    } else {
      setPwCkCheck(2);
    }
  };
  return (
    <>
      <div className="relative width_100p mar_top_25">
        <div className="pw_explanation absolute_top">
          8~16자의 영문과 숫자, 특수문자 조합
        </div>
        <Input
          id={"res_password"}
          name={"비밀번호"}
          value={password}
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
            check === 2
          }`}
        >
          {check === 1 ? "비밀번호를 확인해주세요." : ""}
        </div>
      </div>
      <div className="relative width_100p mar_top_25">
        <div className="pw_explanation absolute_top">
          8~16자의 영문과 숫자, 특수문자 조합
        </div>
        <Input
          id={"res_password_check"}
          name={"비밀번호 확인"}
          value={passwordCheck}
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
    </>
  );
};

export default Password;
