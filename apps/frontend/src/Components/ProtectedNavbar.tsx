import { useAuth } from "../Providers/AuthProvider";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ProtectedNavbar = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth?.setToken("");
        navigate("/", { replace: true });
      };
    
    return auth?.token ? <Navbar handleLogout={handleLogout} /> : <></>;
}

export default ProtectedNavbar;