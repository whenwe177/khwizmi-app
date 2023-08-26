import React, { SVGAttributes } from "react";


const Star: React.FC<SVGAttributes<SVGElement>> = (props) => {
  const {fill, ...rest} = props;
    return (
    <svg
      viewBox="0 0 58 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M29 0L38.6985 16.6512L57.5317 20.7295L44.6924 35.0988L46.6336 54.2705L29 46.5L11.3664 54.2705L13.3076 35.0988L0.468304 20.7295L19.3015 16.6512L29 0Z"
        fill={fill}
      />
    </svg>
  );
};

export default Star;
