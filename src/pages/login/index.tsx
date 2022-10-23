import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { userApi } from "../../hooks/user/userApi";
import './index.css'
export const Login = () => {
    const auth = useContext(AuthContext);
    const useUserApi = userApi()
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPError] = useState("")
    const [cPError, setCPError] = useState("")

    useEffect(() => {
        // const validateToken = async () => {
        //     const tokenResp = await useUserApi.validateToken()
        //     console.log("status", tokenResp.accessToken)
        //     if(tokenResp?.accessToken){
        //         auth.settUser({email: tokenResp.email, password: null, isAuthenticated: true})
        //     }else{
        //         auth.settUser(null!)
        //     }


        // } 
        // validateToken()
        if(auth.user?.isAuthenticated)
            navigate("/")
    }, [auth.user?.isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginResult = await auth.login(email, password);
        // setEmail("");
        // setPassword("");
        if(loginResult){
            navigate("/")
            window.location = window.location
        }

        console.log("erro no login")
    }

    const handleSignup = () =>{
        navigate("/signup")
    }

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        var emailRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
        if(!emailRegex.test(password)){
            setPError("*Senha valida");
        }else{
            setPError("");
        }    
    }

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if(!emailRegex.test(email)){
            setEmailError("*Favor inserir um e-mail valido");
        }else{
            setEmailError("");
        }    
    }

    return(
        <div>
            <div className="login-bg"></div>
            <div className="container-login">
                <form onSubmit={handleSubmit}>
                    <h2>Possui conta?</h2>
                    <input placeholder="e-mail" className="login-input" type="text" value={email} onChange={handleEmail} />
                    <div className="error">{emailError}</div>
                    <input placeholder="senha" type="password" value={password} onChange={handlePassword} />
                    <div className="error">{passwordError}</div>
                    <button className="pointer" type="submit">login</button>
                </form>
                <div className="signup"><span className="pointer" onClick={handleSignup}> ou <strong> cadastre-se</strong> </span></div>
            </div>
        </div>

    )
}