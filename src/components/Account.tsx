import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import authServices from "../services/AuthServices";

interface AccountProps {
  onLogout: () => void;
  onSettingsClick: () => void;
}

const Account: React.FC<AccountProps> = ({ onLogout, onSettingsClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userData = authServices.getLoginData();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="group flex cursor-pointer gap-2 items-center hover:text-orange-500 transition-all duration-300"
        onClick={toggleDropdown}
      >
        <p className="flex gap-2 capitalize">
          <span>{userData?.user.name}</span>{" "}
          <span>{userData?.user.surname}</span>
        </p>
        <button className="flex items-center focus:outline-none">
          <FaUserCircle className="w-8 h-8 text-orange-300 transition-all duration-300 cursor-pointer group-hover:text-orange-500" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-500 rounded-md shadow-lg py-1 z-50">
          <button
            onClick={() => {
              onSettingsClick();
              setIsOpen(false);
            }}
            className="cursor-pointer transition-all duration-200 flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-gray-200 hover:text-orange-400 w-full"
          >
            <span>Settings</span>
            <FaCog className="mr-2" />
          </button>
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="cursor-pointer transition-all duration-200 flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-gray-200 hover:text-orange-400 w-full"
          >
            <span>Logout</span>
            <FaSignOutAlt className="mr-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
