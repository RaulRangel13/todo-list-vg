import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { todoList } from "../../hooks/todo/todoApi";

export const todoBaseApi = axios.create({
    baseURL: 'https://localhost:7222/api/Todo',
    headers: {
        'Accept': 'application/json',
        "Content-type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
})

export const todoBaseFetch = async (meth: string, body: todoList|todoList[], path: string|null) => {
    const rawResponse = await fetch(`https://localhost:7222/api/Todo${path}`, {
        method: meth,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
  }).then((r) => {
    return r;
  }).catch((r) => {
    return r;
  });

  return rawResponse;
//   const content = await rawResponse.json();

}

