import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar activeMenu={activeMenu} />
      {user ? (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="hidden md:block w-64 bg-white shadow-md">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-auto p-4 bg-gray-50">{children}</div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p>No user found</p>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
