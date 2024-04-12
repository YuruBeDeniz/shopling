import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import TodoForm from './TodoForm';

type Todo = {
    id: string;
    todo: string;
    createdAt: Date;
};

export default function TodoList() {
    const [todo, setTodo] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setTodo(e.target.value);
        setError(""); 
    };

    const addTodo = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!todo.trim()) {
            setError("Please enter a todo item.");
            return;
        }
        const newTodo: Todo = {
            id: uuidv4(),
            todo: todo.trim(),
            createdAt: new Date(),
        };
        setTodos([...todos, newTodo]);
        setTodo("");
    };

    const deleteTodo = (id: string): void => {
        setTodos(todos.filter(item => item.id !== id));
    }

    return (
        <>
            <div>TodoList</div>
            <form onSubmit={addTodo}>
        <input 
            value={todo} 
            onChange={handleChange} 
            placeholder="Enter Todo"
        />
        <Button type="submit">Add</Button>
    </form>
    {error && <div style={{color: 'red'}}>{error}</div>}
            <ul>
                {todos.map(item => (
                    <li key={item.id}>
                        {item.todo} (Created on: {item.createdAt.toLocaleString()})
                        <Button variant='outline-danger' onClick={() => deleteTodo(item.id)}>x</Button>
                    </li>
                ))}
            </ul>
        </>
    );
}
