import React, { useState } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";

interface AccountProps {
  onLogout: () => void;
  onSettingsClick: () => void;
}

const Account: React.FC<AccountProps> = ({ onLogout, onSettingsClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center focus:outline-none"
      >
        <FaUserCircle className="w-8 h-8 text-orange-300 transition-all duration-300 cursor-pointer hover:text-orange-500" />
      </button>

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
