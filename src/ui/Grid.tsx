import React from "react";

interface GridProps {
  columns: number;
  gap: number;
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ columns, gap, children }) => {
  return (
    <div
      className={`grid gap-${gap}`}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {children}
    </div>
  );
};

export default Grid;
