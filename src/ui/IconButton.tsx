import { IconType } from "react-icons";
import { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  className?: string;
}

const IconButton = ({
  icon: Icon,
  className = "",
  onClick,
  ...props
}: IconButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className={`text-gray-400 cursor-pointer hover:text-red-500 transition-colors duration-200 ${className}`}
      {...props}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

export default IconButton;
