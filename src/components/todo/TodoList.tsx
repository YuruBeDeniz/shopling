import { useState } from 'react';
import { Todo }  from "./AddTodo";
import { useLocalStorage } from '../../hooks/useLocalStorage';
import AddTodo from './AddTodo';
import SingleTodo from './SingleTodo';



export default function TodoList() {
    const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
    const [error, setError] = useState<string>("");

    const deleteTodo = (id: string): void => {
        setTodos(todos.filter(item => item.id !== id));
    }

    return (
    <>
     <div>TodoList</div>
       <AddTodo todos={todos} setTodos={setTodos} setError={setError} />
     {error && <div style={{color: 'red'}}>{error}</div>}
       <ul>
         {todos.map(item => (
             <li key={item.id}>
                <SingleTodo item={item} onDelete={deleteTodo} />
             </li>
         ))}
       </ul>
    </>
    );
}
