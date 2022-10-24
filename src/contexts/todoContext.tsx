import { createContext, useEffect, useState } from "react";
import { todoApi } from "../hooks/todo/todoApi";

type TodoContextType = {
    todosContext: todoItem[] | null;
    setTodosContextt: (todosContext: todoItem[]|null) => void;
    setTodoContextt: (todosContext: string) => void;
    UpdateTodoContextt: (todosContext: todoItem|null) => void;
    reloadList: () => void;
}

type todoItem = {
    id: number;
    name: string;
    isDone: boolean;
}

export const TodoContext = createContext<TodoContextType>(null!)

export const TodoContextProvider = ({ children }: { children: JSX.Element }) => {
    const useTodoApi = todoApi()
    const [todosContext, setTodosContext] = useState<todoItem[] | null>(null);
    const [reload, setReload] = useState<boolean>()

    const setTodosContextt = (todosContext: todoItem[]|null) => {
        
        localStorage.removeItem("todosContext")
        localStorage.setItem("todosContext", JSON.stringify(todosContext))
        setTodosContext(todosContext)
        // console.log("local storege", localStorage.getItem("todosContext"))


    }

    const setTodoContextt = async (todo: string) => {
        const sucess = await useTodoApi.add(todo)
        if(sucess.status < 200 || sucess.status >= 300){
            console.log("nao foi possivel adicionar a tarefa")
        }else{
            const list = await useTodoApi.list()
            if(!list.erro)
                setTodosContextt(list)
        }
    }  

    const UpdateTodoContextt = (todo: todoItem|null) =>{
        console.log(todo)
        useTodoApi.updadte(todo!);
        
    }

    const reloadList = () => {
        setReload(!reload)
    }

    useEffect(() => {
        const tempTododos = localStorage.getItem("todosContext")
        // console.log(tempTododos)
        if(tempTododos){
            (async () => {
                const response = await useTodoApi.list();
                setTodosContextt(response);
            })();
            return 
        }else{
            setTodosContextt(JSON.parse(tempTododos!))
        }

        // useTodoApi.addTodos(JSON.parse(tempTododos))
    },[reload])

    return(
        <TodoContext.Provider value={{setTodoContextt , todosContext, setTodosContextt, UpdateTodoContextt,reloadList}}>
            {children}
        </TodoContext.Provider>
    )
}