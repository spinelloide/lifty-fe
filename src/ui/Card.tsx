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
      className={`p-4 shadow-lg rounded-lg ${className}`}
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
      }}>
      {children}
    </div>
  );
};
export default Card;
