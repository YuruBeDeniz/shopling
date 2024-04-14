import { Todo } from "./AddTodo";
import { Button } from 'react-bootstrap';
import { formatDate } from "../../utilities/formatDate";

type SingleTodoProps = {
    item: Todo;
    onDelete: (id: string) => void;
}

export default function SingleTodo({ item, onDelete }: SingleTodoProps) {

  return (
    <div className="d-flex justify-content-between align-items-center">
      <span>{item.todo} (Entered on {formatDate(item.createdAt)})</span>
      <Button variant='outline-danger' onClick={() => onDelete(item.id)}>x</Button>
    </div>
  )
}
