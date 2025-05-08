import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Button from './../components/Button';
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const token = params.get('token');
  const email = params.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;

    if (password !== confirm) {
      toast.error('Fjalëkalimet nuk përputhen!');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/reset-password`, {
        email,
        token,
        password,
        password_confirmation: confirm,
      });
      toast.success('Fjalëkalimi u përditësua me sukses!');
    } catch (err) {
      toast.error('Ndodhi një gabim gjatë përditësimit të fjalëkalimit!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Përditëso fjalëkalimin
        </h2>

        <label className="block text-sm text-gray-600 mb-1">Fjalëkalimi i ri</label>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter new password"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <label className="block text-sm text-gray-600 mb-1">Konfirmo fjalëkalimin</label>
        <input
          type="password"
          required
          onChange={(e) => setConfirm(e.target.value)}
          value={confirm}
          placeholder="Confirm new password"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full text-white py-2 rounded-md transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Duke përditësuar...' : 'Përditëso fjalëkalimin'}
        </Button>
      </form>
    </div>
  );
}
