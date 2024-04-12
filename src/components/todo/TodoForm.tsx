import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from 'react-bootstrap';

type TodoFormProps = {
    addTodo: (todo: string) => void;
}

export default function TodoForm({ addTodo }: TodoFormProps) {
    const [todo, setTodo] = useState<string>("");
    const [error, setError] = useState<string>("");





  return (
    <div>

    </div>
  )
}
