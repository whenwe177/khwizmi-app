import React, { SVGAttributes } from "react";

const Moon: React.FC<SVGAttributes<SVGElement>> = (props) => {
  const { fill, ...rest } = props;
  return (
    <svg
      {...rest}
      viewBox="0 0 44 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.63724e-06 56.7981C9.78774 51.8577 16.5 41.7127 16.5 30C16.5 18.2873 9.78773 8.14232 0 3.20187C4.05778 1.15367 8.64416 0 13.5 0C30.0685 0 43.5 13.4315 43.5 30C43.5 46.5685 30.0685 60 13.5 60C8.64416 60 4.05779 58.8463 1.63724e-06 56.7981Z"
        fill="#FF84C6"
      />
    </svg>
  );
};

export default Moon;
