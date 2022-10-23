import { userBaseApi, userBaseFetch } from "../../apis/userApi";
import { User } from "../../contexts/authContext";
import { todoList } from "../todo/todoApi";

export const userApi = () => ({
    validateToken: async () => {
        const storageData = localStorage.getItem('token');

        if (storageData) {
            const data = await userBaseFetch("POST", null, "/refresh-login");
            return data
        }
    },
    logout: () => {

    },
    login: async (user: User) => {
            return await userBaseFetch("POST", user, "/login");
    },
    signup: async (user: User) => {
        return await userBaseFetch("POST", user, "/signup");
    }
})