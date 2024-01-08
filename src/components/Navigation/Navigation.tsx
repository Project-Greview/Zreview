// MODULE
import { useNavigate, useLocation } from "react-router-dom";
// SVG
import { ReactComponent as HomeIcon } from "../../assets/image/icon/Map-icon.svg";
// RPORS TYPE
type NavigationProps = {};
const Navigation: React.FC<NavigationProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="navigate flex flex_jc_sb flex_ai_c">
      <ul className="flex flex_jc_sb flex_ai_c">
        <li>
          <HomeIcon />
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
