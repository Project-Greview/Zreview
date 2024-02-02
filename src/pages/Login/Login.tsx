// MODULE
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// IMAGE
import { ReactComponent as Logo } from "../../assets/image/Logo.svg";
import Button from "components/Common/Button";
// PROPS TYPE
type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  // ENABLE LOGIN BOX
  const handleOnLoginBox = () => {
    setIsReady(true);
  };

  // LOGIN
  const handleLogin = () => {
    navigate("/main");
  };
  return (
    <div
      className="con flex flex_dir_c flex_jc_c flex_ai_c mar_top_50"
      style={{ marginTop: "35% " }}
    >
      <Logo />
      <div className={`login_box ${!isReady ? "" : "active"}`}>
        <div className="input_box">
          <input
            type="text"
            className="input_default width_100p"
            placeholder="아이디"
          />
          <label htmlFor=""></label>
        </div>
        <div className="input_box">
          <input
            type="text"
            className="input_default width_100p"
            placeholder="비밀번호"
          />
          <label htmlFor=""></label>
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
