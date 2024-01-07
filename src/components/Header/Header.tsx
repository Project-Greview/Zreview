// MODULE
import { useNavigate } from "react-router-dom";
// SVG
import { ReactComponent as ArrowLeft } from "../../assets/image/icon/arrow-left.svg";
// PROPS TYPE
type HeaderProps = {
  type: number;
  title: string;
};

const Header: React.FC<HeaderProps> = ({ type, title }) => {
  const navigate = useNavigate();
  return (
    <div className={`header fixed width_100p`}>
      {type === 1 ? (
        ""
      ) : type === 2 ? (
        ""
      ) : (
        <div
          className="flex flex_jc_sb fle_ai_c"
          style={{ boxShadow: "0 0.5rem 1rem #eeeeee" }}
        >
          <div className="back_btn flex flex_ai_c" onClick={() => navigate(-1)}>
            <ArrowLeft color={"#3a3a3a"} />
          </div>
          <div className="page_title flex flex_jc_c flex_ai_c">{title}</div>
        </div>
      )}
    </div>
  );
};

export default Header;
