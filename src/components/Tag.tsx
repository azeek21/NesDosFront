import { PropsWithChildren } from "react";

export default function Tag({ children }: PropsWithChildren) {
  return (
    <span className="rounded-full border px-2 py-1 text-xs opacity-70">
      {children}
    </span>
  );
}
