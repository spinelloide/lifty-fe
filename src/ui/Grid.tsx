import React from "react";

interface GridProps {
  columns: number;
  gap: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Grid: React.FC<GridProps> = ({
  columns,
  gap,
  children,
  className,
  style,
}) => {
  return (
    <div
      className={`grid gap-${gap} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
