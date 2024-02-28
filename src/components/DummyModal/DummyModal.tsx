// MODULE
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
// RECOIL STATE
import { dummyDateState } from "state/dummyState";
// HOOK
import { generateRandomData } from "utils/dummyReview";
// SVG
import { ReactComponent as CloseIcon } from "../../assets/image/icon/close_btn.svg";
// CUSTOM CSS
import dummy from "../../assets/styles/custommodal.module.css";
import Button from "components/Common/Button";
import Input from "components/Common/Input";
// PROPS TYPE
type DummyModalType = {
  close: any;
};
const DummyModal: React.FC<DummyModalType> = ({ close }) => {
  const [dummyDataArray, setDummyDataArray] = useRecoilState(dummyDateState);
  const [dataCount, setDataCount] = useState<number | any>("");

  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDataCount(parseFloat(e.target.value));
  };

  const saveRandomDataToState = () => {
    // RANDUM DUMMY DATA COUNT SET
    if (dataCount === "" || dataCount > 200 || dataCount === 0) {
      alert("데이터 갯수를 정확하게 입력해주새요.");
    } else {
      setDummyDataArray((prevDataArray) => {
        const newRandomDataArray = Array.from(
          { length: dataCount },
          generateRandomData
        );
        return [...prevDataArray, ...newRandomDataArray];
      });
      alert("Data 생성 성공!");
      close();
    }
  };
  const handleCheckData = () => {
    alert(`현재 ${dummyDataArray.length}개의 DummyData 가 있습니다.`);
  };
  return (
    <>
      <div className="modal_bg fixed"></div>
      <div className={`${dummy.modal_frame} modal_frame fixed`}>
        <div
          className={`${dummy.modal_header} modal_header flex flex_jc_sb flex_ai_c`}
        >
          <div className={`${dummy.title} title flex flex_jc_c`}>
            더미데이터 만들기
          </div>
          <div className="close_btn" onClick={close}>
            <CloseIcon width={20} height={20} color={"#959292"} />
          </div>
        </div>
        <div className={`${dummy.modal_body} modal_body`}>
          <ul className={dummy.explanation_list}>
            <li>임시로 DummyData를 생성하기위한 Modal 입니다.</li>
            <li>원하시는 Data 갯수를 입력 후 생성하기 버튼을 눌러주세요!</li>
            <li>1 ~ 200 사이의 숫자를 입력해주세요.</li>
            <li>DummyData는 생생 시 마다 초기화됩니다.</li>
          </ul>
          <div className={`${dummy.count_box} count_box`}>
            <Input
              id={"data_count"}
              name={""}
              value={dataCount}
              onChange={onChangeCount}
              onBlur={null}
              type={"number"}
              maxLength={500}
              placeholder={"생성할 데이터 갯수를 입력하세요"}
              readonly={false}
              styles={""}
            />
          </div>
          <div className={`${dummy.btn_box} btn_box relative flex flex_jc_sb`}>
            <Button
              title={"생성하기"}
              width={"45%"}
              event={() => saveRandomDataToState()}
              styles={"buttons flex flex_jc_c flex_ai_c width_100p cursor_p"}
            />
            <Button
              title={"데이터 확인하기"}
              width={"45%"}
              event={() => handleCheckData()}
              styles={"buttons flex flex_jc_c flex_ai_c width_100p cursor_p"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DummyModal;
