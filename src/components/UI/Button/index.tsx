import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface IButton extends ButtonHTMLAttributes<any> {
  loading?: boolean;
}

export default function Button({
  children,
  className,
  disabled,
  loading,
  ...rest
}: IButton) {
  if (loading) {
    disabled = true;
  }
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`borde rounded-lg border px-4 py-1 ${
        disabled
          ? "border-gray-400 text-gray-400"
          : "border-white hover:scale-105 active:scale-95"
      } ${className}`}
    >
      {children}
      {loading ? " ..." : null}
    </button>
  );
}
