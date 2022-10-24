import { ChangeEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

export const Signup = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirPassword, setCpassword] = useState("");
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPError] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginResult = await auth.signup(email, password, confirPassword);
        
        // setEmail("");
        // setPassword("");
        if(loginResult){
            navigate("/")
            window.location = window.location
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

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        var emailRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
        if(!emailRegex.test(password)){
            setPError("*Senha valida");
        }else{
            setPError("");
        }    
    }

    const handleLogin = () =>{
        navigate("/login")
    }

    const handleCPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setCpassword(e.target.value)
        if(password!==confirPassword){
            setPError("*Senha valida");
        }else{
            setPError("");
        }    
    }

    return (

        <div>
 <div>
            <div className="login-bg"></div>
            <div className="container-login">
                <form onSubmit={handleSubmit}>
                    <h2>Seja bem vindo/a</h2>
                    <input placeholder="e-mail" className="login-input" type="text" value={email} onChange={handleEmail} />
                    <div className="error">{emailError}</div>
                    <input placeholder="senha" type="password" value={password} onChange={handlePassword} />
                    <div className="error">{passwordError}</div>
                    <input placeholder="confirmar senha" type="password" value={confirPassword} onChange={handleCPassword} />
                    <div className="error">{passwordError}</div>
                    <button className="pointer" type="submit">signup</button>
                </form>
                <div className="signup"><span className="pointer" onClick={handleLogin}> ou <strong> ja possui cadastro</strong> </span></div>
            </div>
        </div>
        </div>
       
    )
}