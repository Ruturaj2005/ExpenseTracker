import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      {label && <label className="text-sm text-slate-800">{label}</label>}

      {/* Input Box */}
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:border-blue-500">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-gray-900"
          value={value}
          onChange={onChange}
        />

        {/* Password Toggle Icon */}
        {type === "password" && (
          <span className="cursor-pointer text-gray-500 hover:text-gray-700" onClick={toggleShowPassword}>
            {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
