import { useContext } from "react"
import { AuthContext } from "../../contexts/authContext";
import { Login } from "../login";

export const TodoPrivate = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);
    if(!auth.user?.isAuthenticated)
        return <Login />

    return(
        children
    )
}