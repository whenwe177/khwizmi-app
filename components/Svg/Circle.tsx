import React, { SVGAttributes } from "react";

const Circle: React.FC<SVGAttributes<SVGElement>> = (props) => {
    const { fill, ...rest } = props;
  return (
    <svg
     {...rest}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="30" fill={fill} />
    </svg>
  );
};

export default Circle;
