// MODULE
import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
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
