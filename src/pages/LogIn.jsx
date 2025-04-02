import React, { useState } from 'react';
import { Eye, EyeOff, Apple, ArrowRight } from 'lucide-react';
import loginSvg from "./../assets/login.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('authToken', token);
      console.log('Login successful:', response.data);

      navigate('/donors');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err.response?.data || err.message);
    }
    console.log('Login attempted:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full flex rounded-2xl shadow-lg overflow-hidden">
        {/* Left side - Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-white ">
          <h1 className="text-3xl font-bold mb-8 text-center">Kyqu</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="filanfisteku@gmail.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Futni së paku 8 karaktere!"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-600">Më mbaj mend</span>
              </label>
              <a href="#" className="text-sm text-orange-500 hover:text-orange-600">
                Keni harruar passwordin?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF4C00FF] text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Kyqu</span>
              {/* <ArrowRight size={20} /> */}
            </button>
          </form>

          {error && <p className="text-red-500 text-sm text-center font-semibold mt-5">{error}</p>}


          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Apo kyqu me:</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                  alt="Google"
                  className="h-5 object-contain"
                />
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
                  alt="Facebook"
                  className="h-5 object-contain"
                />
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt="Facebook"
                  className="h-5 object-contain"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Illustration */}
        <div className="hidden md:block w-1/2 bg-[#FF4C00FF] p-12">
          <div className="h-full flex items-center justify-center">
            <img src={loginSvg} alt="Login Illustration" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
