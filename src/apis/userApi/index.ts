import axios from "axios";
import { useContext } from "react";
import { AuthContext, User } from "../../contexts/authContext";
import { todoList } from "../../hooks/todo/todoApi";

export const userBaseApi = axios.create({
    baseURL: 'https://localhost:7222/api/Todo',
    headers: {
        'Accept': 'application/json',
        "Content-type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
})

export const userBaseFetch = async (meth: string, body: User | null, path: string) => {
  const token = localStorage.getItem("token")
    const rawResponse = await fetch(`https://localhost:7222/api/User${path}`, {
        method: meth,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ` + token
        },
        body: JSON.stringify(body)
  }).then((r) => {

    var user = r.json() as Promise<User>;
    return user;
  }).catch((r) => {
    return r;
  });

  return rawResponse;
//   const content = await rawResponse.json();

}

