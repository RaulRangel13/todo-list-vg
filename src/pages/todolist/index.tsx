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
    const [inputAddError, setinputAddError] = useState("")
    const [none,setNone] = useState("display: none;")

    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const todoC = useContext(TodoContext)


    useEffect(() => {

        const days = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"]
        setDay(days[new Date().getDay()-1]);
    },[auth, useTodoApi])

    useEffect(() => {
        // console.log()
    },[])



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

    }

    const handleDelete = async (e: React.MouseEvent<HTMLElement>, id: number) => {
        const sucess = await useTodoApi.delete(id)
        if(sucess.status >= 200 && sucess.status < 300)
            todoC.reloadList();

        if(sucess.status < 200 || sucess.status >= 300)
            alert("nao foi possivel excluir a tarefa")
    };

    const handleAddTodo = async () => {

        todoC.setTodoContextt(todo)
        setTodo("")
    }

    const handleAddTodoInput = (e: ChangeEvent<HTMLInputElement>) =>{
        if(e.target.value.length < 45){
            setTodo(e.target.value)
            setinputAddError("")
        }else{
            setinputAddError("A tarefa pode conter no maximo 45 caracteres")
        }

    }

    const handleLogout = async () => {
        await auth.logout();
        window.location.href = window.location.href;
      }

    return(
        <div>
            <div className="todo-bg"></div>
            <div className="container-todo-list">
                <div className="userName"><span>Olá, {auth.user?.email}</span><button onClick={handleLogout}>Sair</button></div>
                <p className="day-frase">Hoje é {day}, dia de produzir :)</p>

                <div className="button-input">
                    <input className="add-todo" type="text" value={todo} onChange={handleAddTodoInput} />
                    <button type="button" onClick={handleAddTodo}>+</button>
                </div>
                <span className="add-error">{inputAddError}</span>
                <ul>
                    {todoC.todosContext?.map((x,index, array)=>{
                        return <div key={x.id} className="div-li">
                            <li key={x.id}><input type="checkbox" checked={x.isDone} onChange={(e) => checkState(e, x.id)}/><span className={x.isDone ? "done" : ""}>{x.name}</span><button onClick={(event: React.MouseEvent<HTMLElement>) => handleDelete(event, x.id)}><i className="fa-solid fa-trash"></i></button></li>
                            {array.length-1 !== index && <div className="hr" >
                                <hr />
                            </div>}
                            
                            
                        </div>
                    })}
                </ul>
            </div>
        </div>

    )
}