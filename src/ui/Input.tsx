import React from "react";

type Props = {
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
  name?: string;
  defaultValue?: string;
};

const Input = ({
  type,
  onChange,
  placeholder,
  value,
  name,
  defaultValue,
}: Props) => {
  return (
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      name={name}
      defaultValue={defaultValue}
      className="px-4 py-2 bg-white/90 outline-2 outline-gray-500/40 placeholder:text-gray-600/30 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400/80"
    />
  );
};

export default Input;
