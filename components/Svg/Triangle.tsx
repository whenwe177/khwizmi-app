import React, { SVGAttributes } from "react";

const Triangle: React.FC<SVGAttributes<SVGElement>> = (props) => {
    const { fill, ...rest } = props;
    return (
    <svg
      {...rest}
      viewBox="0 0 52 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M26 0L51.9808 45H0.0192375L26 0Z" fill={fill} />
    </svg>
  );
};

export default Triangle;
