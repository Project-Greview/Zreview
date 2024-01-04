// MODULE
import { useState, useEffect } from "react";
// IMAGE
import { ReactComponent as Logo } from "../../assets/image/Logo.svg";
// PROPS TYPE
type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [isReady, setIsReady] = useState(false);

  const handleOnLoginBox = () => {
    setIsReady(true);
  };
  return (
    <div className="con">
      <Logo />
      <div className={`login_box ${!isReady ? "" : ""}`}>
        <div className="input_box">
          <input type="text" />
          <label htmlFor=""></label>
        </div>
        <div className="input_box">
          <input type="text" />
          <label htmlFor=""></label>
        </div>
      </div>
      <div>
        <div
          onClick={
            !isReady ? () => handleOnLoginBox() : () => console.log("로그인")
          }
        >
          {!isReady ? "시작하기" : "로그인"}
        </div>
      </div>
    </div>
  );
};

export default Login;
