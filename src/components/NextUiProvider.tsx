import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export function NextUiProvider({ children }: PropsWithChildren) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
