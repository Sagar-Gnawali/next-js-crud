"use client";
import { useRouter } from "next/navigation";
import { loginValidation } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Input } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginRes, LoginTypes, login } from "@/app/services/auth.service";
import { useMutation } from "react-query";

export default function SignIn() {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (response: LoginRes) => {
      router.push("/todo");
    },
    onError: (err: LoginRes) => {
      throw new Error(err.message);
    },
  });
  const onSubmit: SubmitHandler<LoginTypes> = (data: LoginTypes) => {
    console.log(data);
    mutate(data);
  };
  const { handleSubmit, control } = useForm({
    mode: "all",
    resolver: yupResolver(loginValidation),
  });
  return (
    <div className="mt-24 flex justify-center items-center flex-col">
      Login
      <Card className="w-1/4 py-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-center mt-3 flex-col gap-5"
        >
          <div className="w-3/4">
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Input
                      isRequired
                      {...field}
                      label="email"
                      value={field.value}
                      type="email"
                      name="name"
                    />
                    <span className="text-red-700 text-sx font-small text-sm/[2px]">
                      {error && error.message}
                    </span>
                  </>
                );
              }}
            />
          </div>
          <div className="w-3/4">
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Input
                      isRequired
                      {...field}
                      label="password"
                      value={field.value}
                      type="password"
                    />
                    <span className="text-red-700 text-sm/[2px]">
                      {error && error.message}
                    </span>
                  </>
                );
              }}
            />
          </div>

          <Button
            color="primary"
            variant="solid"
            type="submit"
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
