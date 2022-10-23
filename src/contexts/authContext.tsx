import { type } from "@testing-library/user-event/dist/type";
import { sign } from "crypto";
import { createContext, useEffect, useState } from "react";
import { todoApi } from "../hooks/todo/todoApi";
import { userApi } from "../hooks/user/userApi";

export type AuthContextType = {
    user: User | null;
    token: string;
    loading: boolean;
    settUser: (user: User) => void
    getUser: () => void
    setLoadingg: (loading: boolean) => void
    logout: () => void
    login: (email: string, password: string) => Promise<boolean>
    signup: (email: string, password: string, confirmPassword: string) => Promise<boolean>
}

export type User = {
    email: string;
    password: string | null;
    confirmPassword: string | null;
    isAuthenticated: boolean;
}

type LoginToken = {
    UserName: string,
    Email: string,
    Sucesso: boolean,  
    AccessToken: string, 
    RefreshToken: string, 
    Erros: [] 
}

export const AuthContext = createContext<AuthContextType>({user: {email:"", isAuthenticated:false, password: null, confirmPassword: null},token:"",loading: false,settUser: (user: User) => {},getUser: () => {},setLoadingg: (loading: boolean) => {}, logout: () => {}, login: async (email: string, password: string) => {return false}, signup: async (email: string, password: string, confirmPassword: string) =>{return false}})

export const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
    const useUserApi = userApi()

    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(false);
    const t = todoApi()

    const setLoadingg = (loading: boolean) => {
        setLoading(loading);
    }

    const settUser = (user: User) =>{
        setUser(user);
    }

    const logout = async () => {
        console.log("logout")
        setUser(null)
        localStorage.clear();
    }

    const login = async (email: string, password: string) => {
        if(!email || !password)
        return false
        const userResp = await useUserApi.login({email: email, password: password,confirmPassword: null, isAuthenticated: false})
        if(userResp?.sucesso){
            localStorage.setItem('token', userResp.accessToken);
            setUser({email: userResp.email, isAuthenticated: true, password: null,confirmPassword: null})
            return true;
        }
        return false;
    }

    const signup = async (email: string, password: string, confirmPassword: string) => {
        const userResp = await useUserApi.signup({
            email: email, password, confirmPassword: confirmPassword,
            isAuthenticated: false
        })
        if(userResp?.sucesso){
            localStorage.setItem('token', userResp.accessToken);
            setUser({email: userResp.email, isAuthenticated: true, password: null,confirmPassword: null})
            return true;
        }
        return false;
    }

    const getUser = () => {

    }

    useEffect(() => {
        const validateToken = async () => {
            const tokenResp = await useUserApi.validateToken()
            if(tokenResp?.accessToken){
                setUser({email: tokenResp.email, password: null,confirmPassword: null, isAuthenticated: true})
            }else{
                setUser(null)
            }
        } 
        validateToken()
    }, []);

    return(
        <AuthContext.Provider value={{ user, logout, login, token, loading, setLoadingg, getUser, settUser, signup}}>
            {children}
        </AuthContext.Provider>
    )
}