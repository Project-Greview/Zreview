// MODULE
import { ChangeEvent } from "react";
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
    // let value = e.target.value.replace(
    //   /^[0-9a-zA-Z가-힣ㆍᆞᆢㄱ-ㅎㅏ-ㅣ\x20]*$/gi,
    //   ""
    // );
    let charArray = e.target.value.split("");
    let filteredValue = charArray.filter(
      (c: string) => !/[~!@#$%^&*()_+=-`{}\[\]\|\\:;'<>,./?]/gi.test(c)
    );
    let value = filteredValue.join("");
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
        value={pageType ? loginUserName : name}
        onChange={onChangeRegName}
        type={"text"}
        onBlur={pageType ? undefined : onCheckResName}
        maxLength={10}
        placeholder={""}
        readonly={pageType}
        styles={pageType ? "readonly" : ""}
      />
      <div
        className={`event_txt absolute ${shake && "shake_rotate"} ${
          check === 2
        }`}
      >
        {check === 1 ? "이름을 정확하게 입력해주세요." : check === 2 && ""}
      </div>
    </div>
  );
};

export default Name;
