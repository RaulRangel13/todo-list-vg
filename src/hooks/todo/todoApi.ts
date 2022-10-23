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
        
        // const api = axios.create()
    //     const request = await api.post("https://localhost:7222/api/Todo", {
    //         "name": "teste",
    //         "isDone": true
            
    // },
    //     {
    //         "headers":
    //         {
    //             "Content-type": "application/json",
    //             "Authorization": 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZTE1MzM5Yy0yNzgzLTRjZjItYmExMS0yODI0NmUzY2E3NTIiLCJlbWFpbCI6InV1c2VyQGV4YW1wbGUuY29tIiwianRpIjoiM2U4MjU2YmQtNzliYS00OTM5LTkyOTAtYzllYzI5MTcyZWVlIiwibmJmIjoxNjY2MTI1Njk4LCJpYXQiOiIxOC8xMC8yMDIyIDE3OjQxOjM4IiwiZXhwIjoxNjY2MTI5Mjk4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiQXVkaWVuY2UifQ.LHRxt4xV5QbhKcnYnK4iPhOVwg4m0xhv9RNUK8HcV7WQKc-L1hrCwcGO_wBYHxFI85bcajFYeU-k_l_4OcTGqQ'
    //         }
            
    //     });
    //     // const list = await 
    //     if(request.status === 200){
    //         if(!request.data)
    //             return console.log({error: "voce nao possui tarefas salvas"})
    //         return request.data;
    //     }

        // const resp = await todoBaseApi.put("", JSON.stringify(todo));

        return await todoBaseFetch("PUT", todo, "/Put")
        // console.log(resp)

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