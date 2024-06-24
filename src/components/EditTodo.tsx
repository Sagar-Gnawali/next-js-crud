"use client";
import { Todo, editValidation } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { useTodosContext } from "@/app/hooks";

export default function EditTodo(props: Todo & { onUpdate: () => void }) {
  const { updateTodo } = useTodosContext();
  const onSubmit = (data: Omit<Todo, "id">) => {
    updateTodo(props.id, data.title);
    props.onUpdate();
  };
  const { handleSubmit, control } = useForm({
    mode: "all",
    resolver: yupResolver(editValidation),
    defaultValues: {
      title: props.title,
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <Input
                isRequired
                {...field}
                value={field.value}
                type="text"
                name="title"
              />
              <span className="text-red-700 text-sx font-small text-sm/[2px]">
                {error && error.message}
              </span>
            </>
          );
        }}
      />
      <Button className="mt-2" color="primary" variant="solid" type="submit">
        Update
      </Button>
    </form>
  );
}
