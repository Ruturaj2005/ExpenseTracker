import React, { useState, useContext } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser(); // clears user from context
    localStorage.removeItem("token"); // just in case
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-10">
      <div className="flex items-center gap-5">
        <button
          className="block lg:hidden text-black"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
      </div>

      {/* User profile on right side */}
      {user && (
        <div className="flex items-center gap-4">
          {user.profileImageUrl && (
            <img
              src={user.profileImageUrl}
              alt="profile"
              className="w-9 h-9 rounded-full object-cover"
            />
          )}
          <span className="text-black font-medium">{user.fullName}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}

      {/* Mobile side menu */}
      {openSideMenu && (
        <div className="absolute top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
