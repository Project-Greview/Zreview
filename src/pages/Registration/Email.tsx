// MODULE
import { useState, ChangeEvent } from "react";
import { useRecoilState } from "recoil";
// HOOK
import { getCheckMemberEmailDuplicationIndexedDB } from "api/IDBmember";
// RECOIL PROPS
import { shakeAnimationState } from "state/commonState";
// COMPONENT
import Input from "components/Common/Input";
// JSON
import Domain from "../../json/emailDomainCheck.json";
// PROPS TYPE
type EmailProps = {
  pageType: boolean;
  loginUserEmail: string;
  email: string;
  setEmail: any;
};
const Email: React.FC<EmailProps> = ({
  pageType,
  loginUserEmail,
  email,
  setEmail,
}) => {
  const [shake, setShake] = useRecoilState(shakeAnimationState);
  const [resEmail, setResEmail] = useState<string>(
    pageType ? loginUserEmail : ""
  );
  const [emailDomain, setEmailDomain] = useState<string>("");
  const [emailCheck, setEmailCheck] = useState<number>(0);

  const onDuplicationCheckEmail = async () => {
    try {
      const response = await getCheckMemberEmailDuplicationIndexedDB(resEmail);
      console.log("checkEmail", response);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeRegEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResEmail(e.target.value);
  };

  const onCheckResEmail = () => {
    const isTrue = onDuplicationCheckEmail();
    const finallyEmail = resEmail + "@" + emailDomain;
    setEmail(finallyEmail);
    const resultEmail = email?.split("@")[1];
    const checkDomain = Domain.emailDomainList.some(
      (domain) => domain.name === resultEmail
    );
    if (email?.length < 5 || !checkDomain || emailDomain?.length < 0) {
      setEmailCheck(1);
      setShake(true);
    } else if (!isTrue) {
      setEmailCheck(2);
      setShake(true);
    } else {
      setEmailCheck(3);
    }
  };
  const onChangeRegisterEmailDomain = (e: any) => {
    e.preventDefault();
    setEmailDomain(e.target.value);
    //  checkUserEmailId();
  };
  return (
    <>
      <div className="relative width_100p mar_top_25">
        {pageType ? (
          <Input
            id={"res_email"}
            name={"이메일"}
            value={resEmail}
            type={"text"}
            onChange={onChangeRegEmail}
            onBlur={undefined}
            maxLength={40}
            placeholder={""}
            readonly={pageType}
            styles={""}
          />
        ) : (
          <div className="email_form flex flex_jc_sb flex_ai_c flex_wrap_wrap">
            <label htmlFor="res_email" className="input_name width_100p">
              이메일
            </label>
            <input
              className="input_default"
              type="text"
              id="res_email"
              name="이메일"
              style={{ width: "49%" }}
              onChange={onChangeRegEmail}
              value={resEmail}
            />
            <span style={{ width: "5%" }}>@</span>
            <div className="mail_domain" style={{ width: "44%" }}>
              <input
                className="input_default"
                type="text"
                name="mail_domain"
                id="mail_domain"
                onChange={onChangeRegisterEmailDomain}
                value={emailDomain}
                onBlur={onCheckResEmail}
                maxLength={15}
              />
              <label htmlFor="mail_domain"></label>
            </div>
            <select
              name=""
              id=""
              style={{ width: "100%" }}
              value={emailDomain}
              onChange={(e) => onChangeRegisterEmailDomain(e)}
              className="mar_top_5"
              onBlur={onCheckResEmail}
            >
              <option value="">직접 입력</option>
              <option value="gmail.com">gmail.com</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="kakao.com">kakao.com</option>
              <option value="nate.com">nate.com</option>
              <option value="naver.com">naver.com</option>
            </select>
          </div>
        )}
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
    </>
  );
};

export default Email;
