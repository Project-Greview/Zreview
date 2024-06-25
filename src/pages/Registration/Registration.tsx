// MODULE
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// RECOIL STATE
import { shakeAnimationState } from "state/commonState";
// HOOK
import { getCookie } from "utils/cookies";
import { addMemberDataToIndexedDB } from "api/IDBmember";
import { setModalItem } from "components/Modal/ModalState";
// COMPONENT
import Header from "../../components/Header";
import Button from "components/Common/Button";
import Modal from "components/Modal";
import Email from "./Email";
import Phone from "./Phone";
import Nickname from "./Nickname";
import Name from "./Name";
import Password from "./Password";
import Location from "./Location";
import Setting from "components/MyLocation/Setting/Setting";
// PROPS TYPE
type RegistrationType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  latitude: number;
  setMyLatitude: React.Dispatch<React.SetStateAction<number>>;
  longitude: number;
  setMyLongitude: React.Dispatch<React.SetStateAction<number>>;
};

const Registration: React.FC<RegistrationType> = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const checkPage = state.type === "modify";

  // DUMMY DATA
  const loginUserEmail = getCookie("user")?.email;
  const loginUserPhone = getCookie("user")?.phone;
  const loginUserName = getCookie("user")?.name;

  const [shake, setShake] = useRecoilState(shakeAnimationState);
  const [modalState, setModalState] = useState<number>(0);
  const [selectModal, setSelectModal] = useState<boolean>(false);
  const [registerData, setRegisterData] = useState<any>({
    email: "",
    password: "",
    phone: "",
    nickname: "",
    name: "",
    location: "",
    myLatitude: 0,
    myLongitude: 0,
  });
  const [registerDataCheck, setRegisterDataCheck] = useState<any>({
    email: 0,
    password: 0,
    phone: 0,
    nickname: 0,
    name: 0,
    location: 0,
  });

  // REGISTRATION
  const checkData =
    registerDataCheck.email === 3 &&
    registerDataCheck.password === 2 &&
    registerDataCheck.phone === 3 &&
    registerDataCheck.nickname === 3 &&
    registerDataCheck.name === 2;
  const checkValue = checkData ? "" : "disable";
  // CHECKING
  const handleRegisterZreview = async () => {
    if (!checkData) {
      setModalState(4);
    } else {
      const postData = {
        email: registerData.email,
        password: registerData.password,
        phone: registerData.phone,
        name: registerData.name,
        nickname: registerData.nickname,
        thumbnail: "",
        location: registerData.location,
        myLatitude: registerData.myLatitude,
        myLongitude: registerData.myLongitude,
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
  const handleStep1UserModify = () => {
    setModalState(1);
  };
  useEffect(() => {
    setTimeout(() => {
      setShake(false);
    }, 1000);
  }, [shake]);
  setModalItem("regist", modalState);
  console.log("aaaa", registerDataCheck);
  return (
    <>
      {selectModal && (
        <Setting
          modalOpen={() => setSelectModal(false)}
          location={registerData.location}
          setLocation={(location: string) =>
            setRegisterData((prevData: any) => ({ ...prevData, location }))
          }
          myLatitude={registerData.myLatitude}
          setMyLatitude={(myLatitude: number) =>
            setRegisterData((prevData: any) => ({ ...prevData, myLatitude }))
          }
          myLongitude={registerData.myLongitude}
          setMyLongitude={(myLongitude: number) =>
            setRegisterData((prevData: any) => ({ ...prevData, myLongitude }))
          }
        />
      )}
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
        {!checkPage && (
          <Location
            location={registerData.location}
            modalOpen={() => setSelectModal(true)}
          />
        )}
        <Email
          pageType={checkPage}
          loginUserEmail={loginUserEmail}
          email={registerData.email}
          setEmail={(email: string) =>
            setRegisterData({ ...registerData, email })
          }
          check={registerDataCheck.email}
          setCheck={(email: number) =>
            setRegisterDataCheck({ ...registerDataCheck, email })
          }
        />
        <Password
          password={registerData.password}
          setPassword={(password: string) =>
            setRegisterData({ ...registerData, password })
          }
          check={registerDataCheck.password}
          setCheck={(password: number) =>
            setRegisterDataCheck({ ...registerDataCheck, password })
          }
        />
        <Phone
          pageType={checkPage}
          loginUserPhone={loginUserPhone}
          phone={registerData.phone}
          setPhone={(phone: string) =>
            setRegisterData({ ...registerData, phone })
          }
          check={registerDataCheck.phone}
          setCheck={(phone: number) =>
            setRegisterDataCheck({ ...registerDataCheck, phone })
          }
        />
        <Name
          pageType={checkPage}
          loginUserName={loginUserName}
          name={registerData.name}
          setName={(name: string) => setRegisterData({ ...registerData, name })}
          check={registerDataCheck.name}
          setCheck={(name: number) =>
            setRegisterDataCheck({ ...registerDataCheck, name })
          }
        />
        <Nickname
          pageType={checkPage}
          nickname={registerData.nickname}
          setNickname={(nickname: string) =>
            setRegisterData({ ...registerData, nickname })
          }
          check={registerDataCheck.nickname}
          setCheck={(nickname: number) =>
            setRegisterDataCheck({ ...registerDataCheck, nickname })
          }
        />
        <div className={`btn_box fixed flex ${!checkPage ? checkValue : ""}`}>
          <Button
            title={checkPage ? "수정완료" : "가입하기"}
            event={
              checkPage
                ? () => handleStep1UserModify()
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
