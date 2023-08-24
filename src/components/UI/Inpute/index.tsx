import { InputHTMLAttributes, Ref, useId } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: Ref<HTMLInputElement>;
}

export default function Input({
  className,
  title,
  value,
  inputRef,
  placeholder,
  ...rest
}: IInput) {
  const id = useId();
  return (
    <label
      className={`group relative flex flex-col gap-1 text-lg text-gray-400 focus-within:text-white ${className}`}
      htmlFor={id}
    >
      <input
        ref={inputRef}
        id={id}
        value={value}
        placeholder={placeholder}
        {...rest}
        className={` ${className} rounded-lg border-2 border-gray-500 bg-transparent outline-none focus-within:border-white`}
      />
      <span
        className={`absolute left-8 ${
          value || placeholder ? "top-0" : "top-1/2"
        }  -translate-y-1/2 cursor-text rounded-xl px-1 backdrop-blur-3xl group-focus-within:left-6 group-focus-within:top-0`}
      >
        {title}
      </span>
    </label>
  );
}
