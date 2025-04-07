import React from "react";
import loginpage from "../../assets/images/loginpage.jpg";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      {/* Left Side - Auth Content */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      {/* Right Side - Background and Image */}
      <div className="hidden md:block w-[40vw] h-screen bg-blue-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        {/* 🔹 Decorative Rounded Shapes (Increased Size & Visibility) */}
        <div className="w-64 h-64 rounded-full bg-blue-700 absolute -top-16 -left-10 opacity-90 mix-blend-multiply z-0"></div>
        <div className="w-64 h-64 rounded-full border-[25px] border-blue-500 absolute top-[35%] right-5 opacity-90 z-0"></div>
        <div className="w-64 h-64 rounded-full bg-blue-600 absolute -bottom-16 -left-10 opacity-90 mix-blend-multiply z-0"></div>

        <div className="grid grid-cols-1 z-10">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-blue-700"
          />
        </div>

        {/* 🔹 Image (Higher z-index) */}
        <img
          src={loginpage}
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15 z-10"
          alt="Login Page"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-blue-400/10 border border-gray-200/50 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">${value}</span>
      </div>
    </div>
  );
};
