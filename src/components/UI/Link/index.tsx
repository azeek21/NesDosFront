import NextLink from "next/link";
import { AllHTMLAttributes, MouseEvent } from "react";

interface ILink extends AllHTMLAttributes<null> {
  href: string;
  shallow?: boolean;
}

export default function Link({
  href,
  children,
  className,
  shallow,
  ...rest
}: ILink) {
  return (
    <NextLink
      href={href}
      shallow={shallow || false}
      className={
        "text-blue-300 outline-none focus-within:text-blue-500 hover:text-blue-500 focus:text-blue-500 focus:underline" +
        ` ${className}`
      }
    >
      {children}
    </NextLink>
  );
}
