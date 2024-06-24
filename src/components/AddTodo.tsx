import { useTodosContext } from "@/app/hooks";
import { Todo, addValidation } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@nextui-org/react";
import { HTMLAttributes } from "react";
import { Controller, useForm } from "react-hook-form";

type TodoInputProps = {} & HTMLAttributes<HTMLDivElement>;

export default function AddTodo({ className }: TodoInputProps) {
  const { addTodo } = useTodosContext();
  const { handleSubmit, control, setValue } = useForm({
    mode: "all",
    resolver: yupResolver(addValidation),
  });

  const onSubmit = (data: Omit<Todo, "id">) => {
    addTodo(data.title);
    setValue("title", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <Input
                className="rounded  px-2 py-1 text-lg sm:grow"
                isRequired
                {...field}
                value={field.value}
                type="text"
                name="title"
              />
              <span className="text-red-700 text-sx font-small ml-2 my-3 text-sm/[2px] block">
                {error && error.message}
              </span>
            </>
          );
        }}
      />
      <Button
        type="submit"
        variant="solid"
        color="success"
        className="text-white ml-2"
      >
        Add
      </Button>
    </form>
  );
}
