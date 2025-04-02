import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div
      style={{
        paddingTop: "15vh",
      }}
      className="bg-gradient-to-br from-black via-gray-900 to-black h-screen pt-10 px-20"
    >
      {children}
    </div>
  );
}

export default Layout;
