import { useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { Login } from "../login";

export const Header = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
      await auth.logout();
      window.location.href = window.location.href;
    }

    if(!auth.user?.isAuthenticated)
        return <></>

    return(
        <>
            <nav>
                {auth.user && <button onClick={handleLogout}>Sair</button>}
            </nav>
        </>

    )
}