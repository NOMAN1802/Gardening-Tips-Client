import { Navbar } from "@/src/components/Navbar/navbar";
import { ReactNode } from "react";

const layout = ({children} : {children : ReactNode}) => {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar />
            <main >
              {children}
            </main>
            
          </div>
    );
};

export default layout;