import React from "react";

interface Props {
    height: number;
    width: number;
    color: string;
}

const Upload: React.FC<Props> = ({height, width, color}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M47.5 32.5V42.5C47.5 43.8261 46.9732 45.0979 46.0355 46.0355C45.0979 46.9732 43.8261 47.5 42.5 47.5H7.5C6.17392 47.5 4.90215 46.9732 3.96447 46.0355C3.02678 45.0979 2.5 43.8261 2.5 42.5V32.5M37.5 15L25 2.5M25 2.5L12.5 15M25 2.5V32.5"
        stroke={color}
        stroke-width="3.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Upload;
