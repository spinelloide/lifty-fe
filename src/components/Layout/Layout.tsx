import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <div className="bg-zinc-900 h-[85vh] pt-10 px-20">{children}</div>;
}

export default Layout;
