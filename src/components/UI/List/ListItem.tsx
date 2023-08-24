import { LiHTMLAttributes } from "react";

interface ILi extends LiHTMLAttributes<HTMLLIElement> {
  type: "list" | "card";
}
export default function ListItem({ type, className, children, ...rest }: ILi) {
  if (type == "list") {
  }

  return (
    <li
      {...rest}
      className={`scale-xs relative ${
        type == "list"
          ? "w-full border-b  border-b-neutral-500 px-1 py-1"
          : "h-48 w-96 rounded-xl border p-2 shadow-md hover:shadow-neutral-500"
      } ${className}`}
    >
      {children}
    </li>
  );
}
