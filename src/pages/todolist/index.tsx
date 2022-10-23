import axios from "axios"
import { ChangeEvent, useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext} from "../../contexts/authContext"
import { todoApi, todoList } from "../../hooks/todo/todoApi"
import { userApi } from "../../hooks/user/userApi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css'
import { TodoContext } from "../../contexts/todoContext"

type checkBoxValue = {
    id: number;
    checked: boolean;
}

type body = {name: string, isDone: boolean}
export const TodoList = () => {
    const useTodoApi = todoApi()

    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState<todoList[] | null>(null)
    const [checkBox, setCheckBox] = useState<[checkBoxValue]>([{id: 0, checked: false}]);
    const [checkBoxValues, setCheckBoxValues] = useState()
    const [todoInput, setTodoInput] = useState("");
    const [day, setDay] = useState("");

    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const todoC = useContext(TodoContext)


    useEffect(() => {
        // const t = [{id: 1, name: "teste", isDone: true}]
        // todoC.setTodosContextt(t)

        // (async () => {
        //     const response = await useTodoApi.list();
        //     setTodos(response);
        // })();

        const days = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"]
        setDay(days[new Date().getDay()-1]);
    },[auth, useTodoApi])

    useEffect(() => {
        // console.log()
    },[])

const handleCheckBox = async () => {



    
  }


// const addTodo = async () => await api.post<todoList>("https://localhost:7222/api/Todo", 
// {
//         "name": "tttttmmt",
//         "isDone": true
        
// },
//     {
//         "headers":
//         {
//             'Accept': 'application/json',
//             "Content-type": "application/json",
//             "Authorization": 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZTE1MzM5Yy0yNzgzLTRjZjItYmExMS0yODI0NmUzY2E3NTIiLCJlbWFpbCI6InV1c2VyQGV4YW1wbGUuY29tIiwianRpIjoiM2ExYzQ1ZDItODIxYS00ODc1LTgxOGItMjQ2NWQzZDBiYTU3IiwibmJmIjoxNjY2MjM4OTEwLCJpYXQiOiIyMC8xMC8yMDIyIDAxOjA4OjMwIiwiZXhwIjoxNjY2MjQyNTEwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiQXVkaWVuY2UifQ.NXD9MUIB7_43pi0_hCZL8pCpzRcS4VJvukSR4Kjlw6s1EfWN-q1PBkGvukHQrqvyYEssKeZFc1rerttDJWS6jA'
//         }
        
// })


    const checkState = async (e: ChangeEvent<HTMLInputElement>, id: number) => {
        const taskIndex = todoC.todosContext?.findIndex((task) => {
            return task.id === id;
        });


      
      if(taskIndex==undefined){
        return
      }
        
      const tempTasks = [...todoC.todosContext!];
        
      tempTasks[taskIndex].isDone = !tempTasks[taskIndex]?.isDone;

      
      todoC.UpdateTodoContextt(tempTasks[taskIndex]);
      todoC.setTodosContextt(tempTasks)



        // const checkBoxValues = todos?.filter(x => (x.id === id))
        // if(checkBoxValues === undefined)
        //     return

        // const checkBoxIndex = todos?.indexOf(checkBoxValues[0])

        // if(checkBoxIndex === undefined || todos === null)
        // return

        // console.log("index", checkBoxIndex)
        // console.log(todos)

        // const tempTodos = [...todos]
        // const tempTodo = todos[checkBoxIndex]
        // tempTodos[checkBoxIndex].isDone = e.target.checked;
        // setTodos(tempTodos);
        // console.log("temocheckbox",tempTodo)

        // checkBoxValues[0].isDone = e.target.checked;

        // const resp = await useTodoApi.updadte(checkBoxValues[0])


        // if(resp.status > 200 && resp.status < 300)
        //     alert("erro ao atualizar tarefa")


    }

    const handleDelete = async (e: React.MouseEvent<HTMLElement>, id: number) => {
        const sucess = await useTodoApi.delete(id)
        if(sucess.status >= 200 && sucess.status < 300)
            todoC.reloadList();

        if(sucess.status < 200 || sucess.status >= 300)
            alert("nao foi possivel excluir a tarefa")
        //     console.log(sucess)

        //     setTodos(sucess.data)
        //     response().then((r)=>{
        //         setTodos(r.data)
        //         // r.data.map(x => {if(x.isDone) setIsdone([...isdone, x.id])})
        //     })
        // }
        // console.log("erro")
        // deleteTodo();
    };

    const handleAddTodo = async () => {

        todoC.setTodoContextt(todo)
        setTodo("")
        // const tempTodo = {id:0, name: todo, isDone: false}
        // const temp = [...todoC.todosContext!, tempTodo]
        // todoC.setTodosContextt(temp)



        // console.log("clicado add")
        // const sucess = await useTodoApi.add(todo)
        // setTodo("")
        // console.log(sucess)

        // if(sucess.status < 200 || sucess.status >= 300)
        // alert("nao foi possivel adicionar a tarefa")
    }

    return(
        <div>
            <div className="login-bg"></div>
            <div className="container-todo-list">
                <p className="userName">Olá, {auth.user?.email}</p>
                <p>Hoje é {day}, dia de produzir :)</p>
                {/* <FontAwesomeIcon icon="fa-solid fa-filter" /> */}
                <input className="add-todo" type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
                <button type="button" onClick={handleAddTodo}>adicionar</button>
                <div>
                    
                </div>
                <ul>
                    {/* {todos?.map(item => {
                        return <li key={item.id}><input type="checkbox" checked={item.isDone} onChange={(e) => checkState(e, item.id)}/><span className={item.isDone ? "done" : ""}>{item.name}</span><button onClick={(event: React.MouseEvent<HTMLElement>) => handleDelete(event, item.id)}>delete</button></li>
                    }
                    )} */}
                    {todoC.todosContext?.map(x=>{
                        return <div>
                            <li key={x.id}><input type="checkbox" checked={x.isDone} onChange={(e) => checkState(e, x.id)}/><span className={x.isDone ? "done" : ""}>{x.name}</span><button onClick={(event: React.MouseEvent<HTMLElement>) => handleDelete(event, x.id)}>delete</button></li>
                        </div>
                    })}
                </ul>
            </div>
        </div>

    )
}