// MODULE
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// RECOIL STATE
import { isLoginState } from "state/userState";
// HOOK
import { loginGET } from "api/dummyAPI";
// IMAGE
import { ReactComponent as Logo } from "../../assets/image/Logo.svg";
import Button from "components/Common/Button";
import Input from "components/Common/Input";
// PROPS TYPE
type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useRecoilState(isLoginState);
  const [error, setError] = useState(false);
  const [loginId, setLoginId] = useState<string>("");
  const [loginPw, setLoginPw] = useState<string>("");
  const [isReady, setIsReady] = useState(false);

  // ENABLE LOGIN BOX
  const handleOnLoginBox = () => {
    setIsReady(true);
  };

  const onChangeLoginId = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginId(e.target.value);
  };

  const onChangeLoginPw = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginPw(e.target.value);
  };

  // LOGIN
  const handleLogin = async () => {
    try {
      const response = await loginGET(loginId, loginPw);
      console.log(response);
      setLoginState(true);
      navigate("/main");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div
      className="con flex flex_dir_c flex_jc_c flex_ai_c mar_top_50"
      style={{ marginTop: "35% " }}
    >
      <Logo />
      <div className={`login_box ${!isReady ? "" : "active"} relative`}>
        <div className="input_box ">
          <Input
            id={"login_id"}
            name={""}
            value={loginId}
            onChange={onChangeLoginId}
            type={"text"}
            onBlur={null}
            maxLength={20}
            placeholder="아이디"
            readonly={false}
          />
        </div>
        <div className="input_box">
          <Input
            id={"login_pw"}
            name={""}
            value={loginPw}
            onChange={onChangeLoginPw}
            type={"password"}
            onBlur={null}
            maxLength={20}
            placeholder="비밀번호"
            readonly={false}
          />
        </div>

        <div className="event_txt absolute">
          {error ? "아이디 혹은 비밀번호를 확인해주세요." : ""}
        </div>
      </div>
      <div className="btn_box flex">
        <Button
          title={!isReady ? "시작하기" : "로그인"}
          event={!isReady ? () => handleOnLoginBox() : () => handleLogin()}
          styles={"buttons flex flex_jc_c flex_ai_c width_100p cursor_p"}
          width={"100%"}
        />
      </div>
      <div className="registraion_info flex">
        <div>처음이신가요?&ensp;</div>
        <div
          className="buttons cursor_p"
          onClick={() => navigate("registration", { state: { type: "" } })}
        >
          회원가입
        </div>
      </div>
    </div>
  );
};

export default Login;
