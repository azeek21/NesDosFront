import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface IButton extends ButtonHTMLAttributes<any> {
  loading?: boolean;
  compact?: boolean;
}

export default function Button({
  children,
  className,
  disabled,
  loading,
  compact,
  ...rest
}: IButton) {
  if (loading) {
    disabled = true;
  }
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`borde rounded-lg border focus:outline-blue-500  ${
        disabled
          ? "border-gray-400 text-gray-400"
          : "border-white hover:shadow-md  hover:shadow-neutral-400 active:scale-95"
      }
      ${compact ? "px-2 py-2" : "px-4 py-1"}
       ${className}`}
    >
      {children}
      {loading ? " ..." : null}
    </button>
  );
}
