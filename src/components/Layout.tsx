import { ReactNode } from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  return (
    <>
      {!location.pathname.startsWith("/start") && <Header />}
      <div className="bg-gradient-to-br from-black via-gray-900 to-black h-screen pt-32 relative">
        {children}
      </div>
    </>
  );
}

export default Layout;
