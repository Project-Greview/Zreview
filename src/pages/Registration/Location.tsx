// MODULE
import { useEffect, useState } from "react";
// COMPONENT
import Input from "components/Common/Input";
import Button from "components/Common/Button";
// PROPS TYPE
type LocationType = {
  location: string;
  modalOpen: () => void;
};

const Location: React.FC<LocationType> = ({ location, modalOpen }) => {
  const [selectModal, setSelectModal] = useState<boolean>(false);
  const locationCheck = location.length === 0;
  useEffect(() => {
    const isActive = document;
  }, [selectModal]);
  return (
    <>
      <div className="location relative flex flex_wrap_wrap flex_jc_sb flex_ai_fe width_100p mar_top_25">
        <div>
          <Input
            id={"res_location"}
            name={"위치 설정"}
            value={location}
            onChange={undefined}
            type={"text"}
            onBlur={undefined}
            maxLength={10}
            placeholder={""}
            readonly={true}
            styles={""}
          />
        </div>
        <div className={`${!locationCheck && "disable"} btn_box`}>
          <Button
            styles={`
            } buttons flex flex_jc_c flex_ai_c width_100p cursor_p`}
            title={locationCheck ? "위치설정" : "설정완료"}
            event={modalOpen}
            width={"100%"}
          />
        </div>
      </div>
    </>
  );
};

export default Location;
