import { useContext } from "react";
import { todoBaseApi, todoBaseFetch } from "../../apis/todoBaseApi";
import { AuthContext } from "../../contexts/authContext";
import axios from "axios";

export type todoList = {
    id: number;
    name: string;
    isDone: boolean;
}



export const todoApi = () => ({

    list: async () => {
        const request = await todoBaseApi.get("/GetAll");
        if(request.status === 200){
            if(!request.data)
                return {error: "voce nao possui tarefas salvas"}
            return request.data;
        }
        return {
            errors: {erro: "erro ao carregar tarefas"}
        }
    },
    getById: async (id: number) => {

    },
    updadte:  async (todo: todoList) => {
        return await todoBaseFetch("PUT", todo, "/Put")

    },
    delete: async (id: number) => {
        return await todoBaseApi.delete(`/Delete/${id}`)

    },
    add: async (todo: string) => {
        return await todoBaseFetch("POST", {id: 0, isDone: false, name: todo}, "/Post")
        // console.log("add",resp)
    },
    addTodos: async (todos: todoList[]) => {
        return await todoBaseFetch("POST", todos, "/PostTodos")
        // console.log("add",resp)
    }
});