/* eslint-disable react-hooks/exhaustive-deps */
// MODULE
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// RECOIL STATE
import { isLoginState } from "state/userState";
import { shakeAnimationState } from "state/commonState";
// HOOK
import { getLoginMemberFromIndexedDB } from "api/IDBmember";
// UTIL
import { extractNeighborhoodType } from "utils/location";
// IMAGE
import { ReactComponent as Logo } from "../../assets/image/Logo.svg";
import Button from "components/Common/Button";
import Input from "components/Common/Input";
import { getCookie, setCookie } from "utils/cookies";
// PROPS TYPE
type LoginProps = {
  nickname: string;
  name: string;
  phone: number;
  email: string;
  location: string;
};

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [, setLoginState] = useRecoilState(isLoginState);
  const [shake, setShake] = useRecoilState(shakeAnimationState);
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
      const response: any = await getLoginMemberFromIndexedDB(loginId, loginPw);
      if (response) {
        setLoginState(true);
        const time = 3600;
        const expiration = new Date(Date.now() + time * 720000);
        const userData = {
          nickname: response.nickname,
          name: response.name,
          phone: response.phone,
          email: response.email,
          thumbnail: "",
          token: true,
          location: response.location,
          myLatitude: response.myLatitude,
          myLongitude: response.myLongitude,
          id: response.id,
          review: response.writeReview,
          comment: response.writeComment,
        };
        setCookie("user", JSON.stringify(userData), { expires: expiration });
        navigate("/main");
      } else {
        setError(true);
        setShake(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShake(false);
    }, 1000);
  }, [shake]);

  useEffect(() => {
    // 자동로그인 관련 대기
    const isLogined = getCookie("user")?.token;
    if (isLogined) {
      navigate("/main");
    }
  }, []);
  return (
    <div
      className="con flex flex_dir_c flex_jc_c flex_ai_c mar_top_50"
      style={{ marginTop: "35% ", marginBottom: "10%" }}
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
            styles={""}
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
            styles={""}
          />
        </div>

        <div className={`event_txt absolute ${shake ? "shake_rotate" : ""}`}>
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
