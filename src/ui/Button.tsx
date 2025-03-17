type Props = {
  text: string;
  onClickHandler?: () => void;
  classNames?: string;
};

function Button({ text, onClickHandler, classNames }: Props) {
  return (
    <button
      className={`cursor-pointer px-4 py-2 hover:scale-90 transition-all duration-200 rounded-md ${classNames}`}
      onClick={onClickHandler}
    >
      <span className="lg:text-lg text-md">{text}</span>
    </button>
  );
}

export default Button;
