import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function Page({ children }: Props) {
  return <div className="max-w-7xl mx-auto p-8 relative">{children}</div>;
}

export default Page;
