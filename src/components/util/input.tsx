import React from "react";

type InputProps = Pick<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  | "type"
  | "id"
  | "name"
  | "required"
  | "placeholder"
  | "autoComplete"
  | "className"
  | "value"
  | "onChange"
>;

export default function Input(props: InputProps) {
  return (
    <div>
      <input
        {...props}
        type={props.type ?? "text"}
        className={`${
          props.className ?? ""
        } block w-full focus:outline-none px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6`}
      />
    </div>
  );
}
