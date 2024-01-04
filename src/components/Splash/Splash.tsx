// MODULE
import { useState, useEffect } from "react";
// IMAGE
import { ReactComponent as Logo } from "../../assets/image/Logo.svg";
const Splash: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  return (
    <div className="con">
      <Logo />
      <div></div>
    </div>
  );
};

export default Splash;
