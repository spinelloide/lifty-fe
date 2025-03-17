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
      className={`p-6 shadow-lg rounded-xl bg-white/10 backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 ${className}`}
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
      }}>
      {children}
    </div>
  );
};
export default Card;
