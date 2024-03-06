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
};

const Nickname: React.FC<NicknameType> = ({
  pageType,
  nickname,
  setNickname,
}) => {
  const [shake, setShake] = useRecoilState(shakeAnimationState);
  const [nicknameCheck, setNicknameCheck] = useState<number>(0);

  const onChangeRegNickname = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let value = e.target.value.replace(/[^\w\sㄱ-ㅎ가-힣\u318D]/g, "");
    setNickname(value);
  };
  const onDuplicationCheckNickname = async () => {
    try {
      const response = await getCheckMemberNicknameDuplicationIndexedDB(
        nickname
      );
    } catch (error) {
      console.log(error);
    }
  };
  const onCheckResNickname = () => {
    const isTrue = onDuplicationCheckNickname();
    if (nickname.length < 2) {
      setNicknameCheck(1);
      setShake(true);
    } else if (!isTrue) {
      setNicknameCheck(2);
      setShake(true);
    } else {
      setNicknameCheck(3);
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
              nicknameCheck === 3
            }`}
          >
            {nicknameCheck === 1
              ? "올바른 닉네임을 입력해주세요."
              : nicknameCheck === 2
              ? "중복된 닉네임 입니다."
              : nicknameCheck === 3
              ? "사용 가능한 닉네임 입니다."
              : ""}
          </div>
        </div>
      )}
    </>
  );
};

export default Nickname;
