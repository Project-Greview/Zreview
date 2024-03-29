// MODULE
import { useState, ChangeEvent } from "react";
import { useRecoilState } from "recoil";
// REOIL PROPS
import { shakeAnimationState } from "state/commonState";
// COMPONENT
import Input from "components/Common/Input";
// PROPS TYPE
type NameType = {
  pageType: boolean;
  loginUserName: string;
  name: string;
  setName: any;
  check: number;
  setCheck: any;
};

const Name: React.FC<NameType> = ({
  pageType,
  loginUserName,
  name,
  setName,
  check,
  setCheck,
}) => {
  const [shake, setShake] = useRecoilState(shakeAnimationState);
  const onChangeRegName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let value = e.target.value.replace(/[^\w\sㄱ-ㅎ가-힣\u318D]/g, "");
    setName(value);
  };
  const onCheckResName = () => {
    if (name.length < 2) {
      setCheck(1);
      setShake(true);
    } else {
      setCheck(2);
    }
  };
  return (
    <div className="relative width_100p mar_top_25">
      <Input
        id={"res_name"}
        name={"이름"}
        value={name}
        onChange={onChangeRegName}
        type={"text"}
        onBlur={onCheckResName}
        maxLength={10}
        placeholder={""}
        readonly={pageType}
        styles={""}
      />
      <div
        className={`event_txt absolute ${shake ? "shake_rotate" : ""} ${
          check === 2
        }`}
      >
        {check === 1 ? "이름을 정확하게 입력해주세요." : check === 2 ? "" : ""}
      </div>
    </div>
  );
};

export default Name;
