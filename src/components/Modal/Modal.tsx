// MODULE
// COMPONENT
import Button from "components/Common/Button";

// PROPS TYPE
type ModalProps = {
  type: string;
  contents: string;
  conform: any;
  conform_txt: string;
  cancel: any;
  cancel_txt: string;
};

const Modal: React.FC<ModalProps> = ({
  type,
  contents,
  conform,
  conform_txt,
  cancel,
  cancel_txt,
}) => {
  return (
    <>
      <div className="modal_bg fixed"></div>
      <div className={`modal_frame fixed`}>
        {/* <div className="modal_header flex flex_jc_sb flex_ai_c"></div> */}
        <div className="modal_body">{contents}</div>
        <div className="btn_box flex flex_jc_sb flex_ai_c">
          {cancel === null ? (
            <Button
              title={conform_txt}
              event={conform}
              width={"100%"}
              styles={"buttons"}
            />
          ) : (
            <>
              <Button
                title={cancel_txt}
                event={cancel}
                width={"49%"}
                styles={"double_buttons flex flex_jc_c flex_ai_c"}
              />
              <Button
                title={conform_txt}
                event={conform}
                width={"49%"}
                styles={"double_buttons flex flex_jc_c flex_ai_c"}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
