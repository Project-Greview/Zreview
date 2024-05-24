// MODULE
import { useState, ChangeEvent } from "react";
import { useRecoilState } from "recoil";
// HOOK
import { getCheckMemberNicknameDuplicationIndexedDB } from "api/IDBmember";
// RECOIL PROPS
import { shakeAnimationState } from "state/commonState";
// COMPONENT
import Input from "components/Common/Input";
// PROPS TYPE
type NicknameType = {
  pageType: boolean;
  nickname: string;
  setNickname: any;
  check: number;
  setCheck: any;
};

const Nickname: React.FC<NicknameType> = ({
  pageType,
  nickname,
  setNickname,
  check,
  setCheck,
}) => {
  const [shake, setShake] = useRecoilState(shakeAnimationState);
  const [duplication, setDuplication] = useState<boolean>(true);
  const onChangeRegNickname = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let charArray = e.target.value.split("");
    let filteredValue = charArray.filter(
      (c: string) => !/[~!@#$%^&*()_+=-`{}\[\]\|\\:;'<>,./?]/gi.test(c)
    );
    let value = filteredValue.join("");
    // setNickname(value);
    setNickname(e.target.value);
  };

  const onCheckResNickname = async () => {
    try {
      const response: any | boolean =
        await getCheckMemberNicknameDuplicationIndexedDB(nickname);
      setDuplication(response);
      if (nickname.length < 2) {
        setCheck(1);
        setShake(true);
      } else if (!response) {
        setCheck(2);
        setShake(true);
      } else {
        setCheck(3);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {pageType ? (
        ""
      ) : (
        <div className="relative width_100p mar_top_25">
          <Input
            id={"res_nickname"}
            name={"닉네임"}
            value={nickname}
            onChange={onChangeRegNickname}
            type={"text"}
            onBlur={pageType ? undefined : onCheckResNickname}
            maxLength={12}
            placeholder={""}
            readonly={false}
            styles={""}
          />
          <div
            className={`event_txt absolute ${shake ? "shake_rotate" : ""} ${
              check === 3
            }`}
          >
            {check === 1
              ? "올바른 닉네임을 입력해주세요."
              : check === 2
              ? "중복된 닉네임 입니다."
              : check === 3
              ? "사용 가능한 닉네임 입니다."
              : ""}
          </div>
        </div>
      )}
    </>
  );
};

export default Nickname;
