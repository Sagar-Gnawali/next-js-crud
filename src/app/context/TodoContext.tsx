import { Todo } from "@/utils/Todo";
import { createContext } from "react";

export type TodoContextData = {
  todos: Todo[];
  addTodo: (title: string) => void;
  updateTodo: (id: string, title: string) => void;
  deleteTodo: (id: string) => void;
};

export const TodosContext = createContext<TodoContextData | undefined>(
  undefined
);
