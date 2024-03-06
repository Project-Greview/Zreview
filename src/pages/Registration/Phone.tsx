// MODULE
import { useState, ChangeEvent } from "react";
import { useRecoilState } from "recoil";
// HOOK
import { getCheckMemberPhoneDuplicationIndexedDB } from "api/IDBmember";
// RECOIL PROPS
import { shakeAnimationState } from "state/commonState";
// COMPONENT
import Input from "components/Common/Input";
// PROPS TYPE
type PhoneProps = {
  pageType: boolean;
  loginUserPhone: string;
  phone: string;
  setPhone: any;
};

const Phone: React.FC<PhoneProps> = ({
  pageType,
  loginUserPhone,
  phone,
  setPhone,
}) => {
  const [shake, setShake] = useRecoilState(shakeAnimationState);
  const [phoneCheck, setPhoneCheck] = useState<number>(0);

  const onChangeRegPhone = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 10) {
      value =
        value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7);
    }
    setPhone(value);
  };
  const onCheckResPhone = () => {
    const isTrue = onDuplicationCheckPhone();
    if (phone?.length < 10) {
      setPhoneCheck(1);
      setShake(true);
    } else if (!isTrue) {
      setPhoneCheck(2);
      setShake(true);
    } else {
      setPhoneCheck(3);
    }
  };

  const onDuplicationCheckPhone = async () => {
    try {
      const response = await getCheckMemberPhoneDuplicationIndexedDB(phone);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative width_100p mar_top_25">
      <Input
        id={"res_phone"}
        name={"핸드폰 번호"}
        value={pageType ? loginUserPhone : phone}
        onChange={onChangeRegPhone}
        type={"text"}
        onBlur={pageType ? undefined : onCheckResPhone}
        maxLength={11}
        placeholder={""}
        readonly={pageType}
        styles={""}
      />
      <div
        className={`event_txt absolute ${shake ? "shake_rotate" : ""} ${
          phoneCheck === 3
        }`}
      >
        {phoneCheck === 1
          ? "올바른 전화번호를 입력해주세요."
          : phoneCheck === 2
          ? "가입된 전화번호 입니다."
          : phoneCheck === 3
          ? "사용 가능한 전화번호 입니다."
          : ""}
      </div>
    </div>
  );
};

export default Phone;
