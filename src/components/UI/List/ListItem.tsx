import { LiHTMLAttributes } from "react";

interface ILi extends LiHTMLAttributes<unknown> {
  type: "compact" | "card";
}
export default function ListItem({ type, className, children, ...rest }: ILi) {
  if (type == "compact") {
  }

  return (
    <li
      {...rest}
      className={`relative ${
        type == "compact"
          ? "border-b px-1 py-1"
          : "rounded-xl border p-2 shadow-md hover:shadow-neutral-500"
      } ${className}`}
    >
      {children}
    </li>
  );
}
