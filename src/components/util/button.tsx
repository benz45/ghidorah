import React from "react";

type ButtonProps = Pick<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "id" | "type" | "name" | "className" | "disabled" | "onClick"
> & { text: string };
export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`${
        props.className ?? ""
      } flex w-full justify-center rounded-md bg-pink-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600`}
    >
      {props.text}
    </button>
  );
}
