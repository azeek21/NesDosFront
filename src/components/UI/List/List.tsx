import { HTMLAttributes, OlHTMLAttributes } from "react";

interface IList extends OlHTMLAttributes<unknown> {}

export default function List({ children, className, ...rest }: IList) {
  return (
    <ol {...rest} className={"relative list-none" + ` ${className}`}>
      {children}
    </ol>
  );
}
