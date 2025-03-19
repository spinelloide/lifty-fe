import React from "react";

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className="w-full h-[80vh] justify-center items-center flex">
      <div className={`${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient
            id="a11"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stopColor="#E3EAE6"></stop>
            <stop offset=".3" stopColor="#E3EAE6" stopOpacity=".9"></stop>
            <stop offset=".6" stopColor="#E3EAE6" stopOpacity=".6"></stop>
            <stop offset=".8" stopColor="#E3EAE6" stopOpacity=".3"></stop>
            <stop offset="1" stopColor="#E3EAE6" stopOpacity="0"></stop>
          </radialGradient>
          <circle
            transform-origin="center"
            fill="none"
            stroke="url(#a11)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            transform-origin="center"
            fill="none"
            opacity=".2"
            stroke="#E3EAE6"
            strokeWidth="15"
            strokeLinecap="round"
            cx="100"
            cy="100"
            r="70"
          />
        </svg>
      </div>{" "}
    </div>
  );
};

export default Loader;
