import { Todo } from "@/utils";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import EditTodo from "./EditTodo";
import { Input } from "@nextui-org/react";
import { useTodosContext } from "@/app/hooks";
type TodoItemProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoItemProps) {
  const { deleteTodo } = useTodosContext();
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex space-x-2 border px-2 mb-4 py-1">
      {editing ? (
        <>
          <EditTodo
            id={todo.id}
            title={todo.title}
            onUpdate={() => {
              setEditing(false);
            }}
          />
        </>
      ) : (
        <>
          <Input value={todo.title} disabled />
        </>
      )}
      <button
        className="rounded bg-red-500 p-1 self-start m-1"
        onClick={() => deleteTodo(todo.id)}
      >
        <MdOutlineDelete />
      </button>
      <button
        className="rounded bg-amber-500 p-1 self-start m-1"
        onClick={() => setEditing((prev) => !prev)}
      >
        <FaRegEdit />
      </button>
    </div>
  );
}
