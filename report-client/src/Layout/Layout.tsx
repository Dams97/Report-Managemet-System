import { ReactNode } from "react";
import {Footer} from "../component/Footer/Footer";
import {Navbar} from "../component/Navbar/Navbar";
import { Sidebar } from "../component/Sidemenu/Sidemenu";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
   
    <Navbar/>
 <div className="home">   
 <div className="home__left">
     <Sidebar/></div>
     <div className="home__usetable">  {children}
     
     </div>
   </div>
  
<Footer/>
</>
  );
};

export default Layout;
