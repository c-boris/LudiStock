import PropTypes from "prop-types";
import { useAuth } from "./useAuth";
import LoginForm from "../components/Forms/LoginForm/";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user.isLoggedIn) {
    return <LoginForm />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
