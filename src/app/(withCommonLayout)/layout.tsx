import { ReactNode } from "react";

import { Navbar } from "@/src/components/Navbar/navbar";
import Footer from "@/src/components/Footer/Footer";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer/>
    </div>
    
  );
};

export default layout;
