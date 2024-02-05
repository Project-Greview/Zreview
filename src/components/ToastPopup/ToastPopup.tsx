// MODULE
import { useLayoutEffect, useState } from "react";
import { useRecoilState } from "recoil";
// RECOIL STATE
import { toastPopupState } from "state/commonState";
// PROPS TYPE
type ToastPopupProps = {
  ready: boolean;
};

const ToastPopup: React.FC<ToastPopupProps> = ({ ready }) => {
  const [toastModal, setToastModal] = useRecoilState(toastPopupState);
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    setLoading(true);
  }, []);
  return (
    <div
      className={`toast_section absolute ${
        toastModal && loading ? "active" : ""
      }`}
    >
      <div className="toast_header flex flex_dir_c flex_jc_c flex_ai_c">
        <div className="drag_icon"></div>
      </div>
      <div className="toast_body"></div>
    </div>
  );
};

export default ToastPopup;
