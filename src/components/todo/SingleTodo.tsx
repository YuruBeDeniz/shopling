import { Todo } from "./AddTodo";
import { Button } from 'react-bootstrap';

type SingleTodoProps = {
    item: Todo;
    onDelete: (id: string) => void;
}

export default function SingleTodo({ item, onDelete }: SingleTodoProps) {
  return (
    <div>
     {item.todo} (Created on: {item.createdAt.toLocaleString()})
     <Button variant='outline-danger' onClick={() => onDelete(item.id)}>x</Button>   
    </div>
  )
}
