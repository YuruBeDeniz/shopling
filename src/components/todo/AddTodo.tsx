import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export type Todo = {
  id: string;
  todo: string;
  createdAt: Date;
};

type AddTodoProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>
}

export default function AddTodo({ todos, setTodos, setError }: AddTodoProps) {
  const [todo, setTodo] = useState<string>("");

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

  return (
    <Form onSubmit={addTodo} className="mb-3">
      <InputGroup>
        <Form.Control 
          value={todo} 
          onChange={handleChange} 
          placeholder="Enter Todo"
        />
        <Button variant="primary" type="submit">Add</Button>
      </InputGroup>
    </Form>
  )
}
