import { Navigate } from 'react-router-dom';

export default function RedirectIfAuthenticated({ children }) {
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');

  if (token) {
    if (userRole === 'donor') {
      return <Navigate to="/donor-dashboard" replace />;
    }
    if (userRole === 'recipient') {
      return <Navigate to="/recipient-dashboard" replace />;
    }
  }

  return children;
}
