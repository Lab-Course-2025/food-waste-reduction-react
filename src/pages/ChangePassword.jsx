import React, { useState } from 'react';
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { toast } from "react-hot-toast";
import { apiClient } from '../utils/apiClient';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Check if the current password is provided
    if (!currentPassword) {
      newErrors.currentPassword = '*E nevojshme.';
    }

    if (newPassword && newPassword.length < 8) {
      newErrors.newPassword = "Fjalëkalimi duhet të ketë të paktën 8 karaktere.";
    }

    // Check if the new password is provided
    if (!newPassword) {
      newErrors.newPassword = '*E nevojshme.';
    }

    // Check if the confirm password is provided
    if (!confirmPassword) {
      newErrors.confirmPassword = '*E nevojshme.';
    }

    // Check if new password and confirm password match
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = '*Fjalëkalimi i ri dhe konfirmimi nuk përputhen.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the form is valid before submitting
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const userRole = localStorage.getItem('userRole');

      const response = await apiClient.patch('/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword
      });

      toast.success('Fjalëkalimi u ndryshua me sukses!');

      setTimeout(() => {
        if (userRole === 'donor') {
          navigate('/donor-profile');
        } else if (userRole === 'recipient') {
          navigate('/recipient-dashboard');
        }
      }, 400);

    } catch (err) {
      if (err.response && err.response.data.message === 'Fjalëkalimi aktual nuk është i saktë.') {
        toast.error('Fjalëkalimi aktual nuk është i saktë.');
        return;
      }
      toast.error('Ndodhi një gabim gjatë ndryshimit të fjalëkalimit!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl flex items-center ml-0">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center space-x-2"
          >
            <ArrowLeft size={20} />
            <span className="text-base font-medium">Prapa</span>
          </button>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Ndrysho fjalëkalimin</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Fjalëkalimi Aktual</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Fjalëkalimi i ri</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}

              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Konfirmo fjalëkalimin</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}

              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-md transition duration-200 text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? 'Duke ndryshuar...' : 'Ndrysho Fjalëkalimin'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;;;;;;
