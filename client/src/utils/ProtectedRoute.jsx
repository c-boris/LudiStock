import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';  // Mettez à jour le chemin selon votre structure

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  // console.log("User in ProtectedRoute:", user);

  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
