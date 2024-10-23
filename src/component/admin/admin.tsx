import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";

const Admin = () => {
     return (
          <div className="flex h-screen">
               {/* Sidebar */}
               <div className="w-64 fixed left-0 h-full">
                    <SideBar />
               </div>

               {/* Main Content (Outlet) */}
               <div className="ml-[300px] z-0 bg-sky-200 border-1 flex-1 p-4">
                    <Outlet />
               </div>
          </div>
     )
};

export default Admin;
