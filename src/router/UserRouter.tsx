// MODULE
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
// PROPS TYPE
type UserRouterProps = {
  children: any;
};

const UserRouter: React.FC<UserRouterProps> = ({ children }) => {
  if (children) {
    return children;
  }
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};

export default UserRouter;
