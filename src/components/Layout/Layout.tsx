// MODULE
import { Outlet } from "react-router-dom";

// PROPS TYPE
type LayoutProps = {};

const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className="outlet">
      <Outlet />
    </div>
  );
};

export default Layout;
