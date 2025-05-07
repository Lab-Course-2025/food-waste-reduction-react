import { useState } from 'react';
import axios from 'axios';
import Button from './../components/Button';
import { toast } from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;

    setLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/forgot-password`, { email });
      toast.success('Linku për përditësimin e fjalëkalimit u dërgua me sukses në emailin tënd!');
    } catch (err) {
      if (err.response?.data?.error === "We can't find a user with that email address.") {
        toast.error('Nuk mund të gjejmë një përdorues me këtë email adresë!');
      } else {
        toast.error('Ndodhi një gabim gjatë dërgimit të linkut. Ju lutemi provoni përsëri!');
      }
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
          Keni harruar fjalëkalimin
        </h2>
        <label className="block text-sm text-gray-600 mb-1">Email adresa</label>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Shkruaj email tënd"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full text-white py-2 rounded-md transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Duke dërguar...' : 'Dërgo linkun'}
        </Button>
      </form>
    </div>
  );
}
