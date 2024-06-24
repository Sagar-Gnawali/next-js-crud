import { useContext } from "react";
import { TodosContext } from "../context/TodoContext";

export function useTodosContext() {
  const todoData = useContext(TodosContext);
  if (todoData === undefined) {
    throw new Error("Eror while getting todo");
  }

  return todoData;
}
