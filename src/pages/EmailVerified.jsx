import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const EmailVerified = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">E-maili juaj është verifikuar!</h2>
        <p className="text-gray-700 mb-6">
          Tani mund të kyqeni në llogarinë tuaj.
        </p>
        <Link to="/login">
          <Button className="py-2 px-6 rounded transition-colors">
            Kyqu
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmailVerified;