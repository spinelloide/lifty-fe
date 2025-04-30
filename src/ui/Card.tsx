interface CardProps {
  width: string;
  height: string;
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  width,
  height,
  className = "",
  children,
}) => {
  return (
    <div
      className={`p-6 z-99 shadow-lg rounded-t-xl bg-white/10 backdrop-blur-sm  ${className}`}
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
      }}
    >
      {children}
    </div>
  );
};
export default Card;
