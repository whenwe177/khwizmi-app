import React from "react";

const Star = ({  children, ...rest }: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      {...rest}
      viewBox="0 0 155 157"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M63.6341 2.34638C64.5733 0.142217 67.433 -0.431499 69.1498 1.2398L102.823 34.021C103.385 34.5681 104.118 34.9048 104.9 34.9743L151.709 39.1357C154.096 39.3479 155.525 41.8903 154.466 44.0395L133.695 86.1944C133.348 86.898 133.255 87.6995 133.43 88.464L143.937 134.269C144.473 136.604 142.497 138.749 140.126 138.406L93.6152 131.678C92.8389 131.566 92.0477 131.724 91.3748 132.128L51.0588 156.275C49.0034 157.506 46.3526 156.289 45.9461 153.928L37.9723 107.615C37.8393 106.842 37.4438 106.139 36.8526 105.623L1.42861 74.7425C-0.377431 73.168 -0.0393749 70.271 2.08064 69.1547L43.663 47.2598C44.357 46.8943 44.9038 46.3008 45.2113 45.5793L63.6341 2.34638Z"
        fill="url(#paint0_linear_4_3320)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4_3320"
          x1="13.9527"
          y1="12.5071"
          x2="179.838"
          y2="204.863"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0729167" stopColor="#FFDF9C" />
          <stop offset="0.421875" stopColor="#FFBF3A" />
          <stop offset="0.786458" stopColor="#DE6B00" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Star;
