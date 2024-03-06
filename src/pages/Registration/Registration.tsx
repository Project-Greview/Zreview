// MODULE
import { useState, useEffect, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// RECOIL STATE
import { shakeAnimationState } from "state/commonState";
// HOOK
import { CheckPasswordText } from "utils/textUtil";
import { getCookie } from "utils/cookies";
import { addMemberDataToIndexedDB } from "api/IDBmember";
import { setModalItem } from "components/Modal/ModalState";
// COMPONENT
import Input from "../../components/Common/Input";
import Header from "../../components/Header";
import Button from "components/Common/Button";
import Modal from "components/Modal";
import Email from "./Email";
import Phone from "./Phone";
import Nickname from "./Nickname";
import Name from "./Name";

// PROPS TYPE
type RegistrationProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
};

const Registration: React.FC<RegistrationProps> = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const checkPage = state.type === "modify";

  // DUMMY DATA
  const loginUserEmail = getCookie("user")?.email;
  const loginUserPhone = getCookie("user")?.phone;
  const loginUserName = getCookie("user")?.name;

  const [shake, setShake] = useRecoilState(shakeAnimationState);
  const [modalState, setModalState] = useState<number>(0);
  const [registerData, setRegisterData] = useState<any>({
    email: "",
    password: "",
    phone: "",
    nickname: "",
    name: "",
  });

  const [resPassword, setResPassword] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<number>(0);
  const [resPasswordCheck, setResPasswordCheck] = useState<string>("");
  const [pwCkCheck, setPwCkCheck] = useState<number>(0);
  // const [resPhone, setResPhone] = useState<string>(
  //   checkPage ? loginUserPhone : ""
  // );
  // const [resName, setResName] = useState<string>(
  //   checkPage ? loginUserName : ""
  // );
  // const [nameCheck, setNameCheck] = useState<number>(0);
  const [nicknameCheck, setNicknameCheck] = useState<number>(0);

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

  // REGISTRATION
  const checkValue =
    pwCheck === 2 &&
    pwCkCheck === 2 &&
    nicknameCheck === 3 &&
    nicknameCheck === 3
      ? ""
      : "disable";
  // CHECKING

  const handleRegisterZreview = async () => {
    if (checkValue) {
      setModalState(4);
    } else {
      const postData = {
        email: registerData.email,
        password: resPassword,
        phone: registerData.phone,
        name: registerData.name,
        nickname: registerData.nickname,
      };
      try {
        const response = await addMemberDataToIndexedDB(postData);
        if (response === "success") {
          setModalState(3);
        }
      } catch (error) {
        console.log(error);
      }
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
  setModalItem("regist", modalState);
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
      ) : modalState === 4 ? (
        <Modal
          type={"type_2"}
          contents={"필수값을 입력해주세요."}
          conform={() => setModalState(0)}
          conform_txt={"확인"}
          cancel={null}
          cancel_txt={""}
        />
      ) : (
        ""
      )}
      <Header type={2} title={checkPage ? "개인정보 수정" : "회원가입"} />
      <div className="res_form_section relative">
        <Email
          pageType={checkPage}
          loginUserEmail={loginUserEmail}
          email={registerData.email}
          setEmail={(email: string) =>
            setRegisterData({ ...registerData, email })
          }
        />

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
        <Phone
          pageType={checkPage}
          loginUserPhone={loginUserPhone}
          phone={registerData.phone}
          setPhone={(phone: string) =>
            setRegisterData({ ...registerData, phone })
          }
        />
        <Name
          pageType={checkPage}
          loginUserName={loginUserName}
          name={registerData.name}
          setName={(name: string) => setRegisterData({ ...registerData, name })}
        />
        <Nickname
          pageType={checkPage}
          nickname={registerData.nickname}
          setNickname={(nickname: string) =>
            setRegisterData({ ...registerData, nickname })
          }
        />
        <div className={`btn_box fixed flex ${!checkPage ? checkValue : ""}`}>
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
