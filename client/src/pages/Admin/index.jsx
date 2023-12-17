import AdminForm from "../../components/Forms/AdminForm/";
import Error from "../../pages/Error/";
import { useAuth } from "../../utils/useAuth";

const Admin = () => {
  const { user } = useAuth();

  return <div id="admin">{user.isAdmin ? <AdminForm /> : <Error />}</div>;
};

export default Admin;
