import { useState } from 'react';
import { Todo }  from "./AddTodo";
import { useLocalStorage } from '../../hooks/useLocalStorage';
import AddTodo from './AddTodo';
import SingleTodo from './SingleTodo';
import { Container, ListGroup, Alert } from 'react-bootstrap';


export default function TodoList() {
    const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
    const [error, setError] = useState<string>("");

    const deleteTodo = (id: string): void => {
        setTodos(todos.filter(item => item.id !== id));
    }

    return (
    <Container className="mt-4">
      <h2 className="mb-3">Todo List</h2>
      <AddTodo todos={todos} setTodos={setTodos} setError={setError} />
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup>
        {todos.map(item => (
          <ListGroup.Item key={item.id}>
            <SingleTodo item={item} onDelete={deleteTodo} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
    );
}
