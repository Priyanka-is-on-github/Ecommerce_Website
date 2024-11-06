import { ReactNode } from "react";
import NavigationBar from "./navigationbar/NavigationBar";

type props = {
  children: ReactNode;
};

function Layout({ children }: props) {
  return (
    <>
      <NavigationBar />

      <main className="flex justify-center">{children}</main>
    </>
  );
}

export default Layout;
