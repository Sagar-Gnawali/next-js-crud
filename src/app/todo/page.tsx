"use client";
import { Todo } from "@/utils/Todo";
import { useEffect, useState } from "react";
import { TodosContext } from "../context/TodoContext";
import { nanoid } from "nanoid";
import useLocalStorage from "../hooks/useLocal";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";

export default function TodoPage() {
  const [todos, setTodosToLocal] = useLocalStorage<Todo[]>("todos", []);
  const [mount, checkMount] = useState(true);
  //need to do some research on hydartion
  useEffect(() => {
    checkMount(false);
  }, []);

  const addTodo = (title: string) => {
    if (!title) return;

    const newTodo: Todo = {
      id: nanoid(), //for setting uniq key for each todo
      title: title,
    };
    setTodosToLocal((prev) => [...prev, newTodo]);
  };

  const updateTodo = (id: string, title: string) => {
    setTodosToLocal((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: title !== undefined ? title : todo.title,
          };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: string) => {
    setTodosToLocal((prev) => prev.filter((todo) => todo.id !== id));
  };

  if (mount) return <></>;

  return (
    <div className="flex justify-center items-center  w-screen h-screen ">
      <div className=" max-w-xs sm:max-w-lg h-2/3 mx-4">
        <div className="header flex justify-between">
          <h1 className="text-3xl text-center">Todo Portal</h1>
        </div>
        <TodosContext.Provider
          value={{
            todos: todos,
            addTodo,
            deleteTodo,
            updateTodo,
          }}
        >
          <div className="grid grid-cols-2 gap-3.5">
            <AddTodo />
            <TodoList />
          </div>
        </TodosContext.Provider>
      </div>
    </div>
  );
}
