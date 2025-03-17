type Props = {
  text: string;
  onClickHandler?: () => void;
  classNames?: string;
};

function PrimaryButton({ text, onClickHandler, classNames }: Props) {
  return (
    <button
      className={`cursor-pointer px-4 py-2 bg-orange-400 hover:bg-orange-500 transition-all duration-200 rounded-md ${classNames}`}
      onClick={onClickHandler}
    >
      <span className="lg:text-lg text-md">{text}</span>
    </button>
  );
}

export default PrimaryButton;
