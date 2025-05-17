import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function BackHeader({ to = -1, label = "Prapa" }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b px-6 py-4">
      <div className="max-w-4xl flex items-center ml-0">
        <button
          onClick={() => navigate(to)}
          className="cursor-pointer flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span className="text-base font-medium">{label}</span>
        </button>
      </div>
    </div>
  );
}

export default BackHeader;
