import React from "react";
import { sidebarIcons } from "./sidebarIcons";
import logo from "/Logo.svg";


export const Sidebar: React.FC = () => {
  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
      {/* Logo */}
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-8">
        <img src={logo} className="text-white font-bold text-sm" />
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col gap-4">
        {sidebarIcons.map((item) => (
          <button
            key={item.id}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              item.active
                ? "bg-blue-100 text-blue-600"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            <img src={item.Icon} alt={item.id} className="w-5 h-5" />
          </button>
        ))}
      </nav>
    </div>
  );
};
