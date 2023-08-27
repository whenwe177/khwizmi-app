import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionValue, motion } from "framer-motion";

interface Props extends React.SVGAttributes<SVGElement> {
  position?: MotionValue<string>;
  posX: number;
  posY: number;
  float?: boolean;
  jokes?: string[];
}

const Khwarizmi = ({ children, posX, posY, float, jokes, position, ...rest }: Props) => {
  let [rotation, setRotation] = useState(0);
  const jokeIndex = useRef(0);
  const [showJoke, setShowJoke] = useState(false);

  useEffect(() => {
    if (jokes) {
      let id = setInterval(() => {
        setShowJoke(true);
        setTimeout(() => {
          setShowJoke(false);
          if (jokeIndex.current >= jokes.length - 1) {
            jokeIndex.current = 0;
          } else {
            jokeIndex.current += 1;
          }
        }, 5000);
      }, 15000);
      return () => clearInterval(id);
    }
  }, [jokes]);

  useEffect(() => {
    const trackMouse = (e: MouseEvent) => {
      const anchor = document.getElementById("anchor")!;
      const rect = anchor.getBoundingClientRect();
      const anchorX = rect.left + rect.width / 2;
      const anchorY = rect.top + rect.height / 2;

      const dy = e.clientY - anchorY;
      const dx = e.clientX - anchorX;

      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      setRotation(angle);
    };
    addEventListener("mousemove", trackMouse);
    return () => removeEventListener("mousemove", trackMouse);
  }, []);

  const showJokeBox = showJoke && jokes;
  const pos = position || "fixed"

  return (
    <motion.div
      id="anchor"
      className="z-10"
      style={{ position : pos }}
      initial={{ x: posX, y: posY }}
      animate={{ x: posX, y: float ? posY + 30 : posY }}
      transition={{
        y: float
          ? {
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2,
              repeatDelay: 0,
              ease: "linear",
            }
          : undefined,
      }}
    >
      <svg
        {...rest}
        viewBox="0 0 360 396"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M150.358 91.5967C152.05 87.8879 156.938 87.0346 159.787 89.951L215.656 147.153C216.589 148.107 217.822 148.712 219.148 148.863L298.589 157.948C302.639 158.412 304.961 162.797 303.068 166.407L265.93 237.219C265.31 238.401 265.117 239.76 265.382 241.068L281.291 319.428C282.102 323.424 278.648 326.987 274.63 326.302L195.808 312.864C194.492 312.64 193.14 312.876 191.978 313.533L122.368 352.877C118.82 354.883 114.363 352.7 113.773 348.666L102.196 269.55C102.003 268.229 101.36 267.016 100.376 266.114L41.4474 212.069C38.443 209.314 39.1422 204.401 42.796 202.593L114.463 167.134C115.659 166.542 116.614 165.556 117.168 164.342L150.358 91.5967Z"
          fill="url(#paint0_linear_4_3232)"
        />
        <path
          d="M134.053 110.022L256.783 131.824C259.376 140.673 262.287 159.284 253.187 162.938C241.812 167.505 187.041 150.858 177.532 145.95C169.925 142.024 157.23 141.273 151.833 141.389C137.154 144.513 105.183 181.7 100.261 182.578C95.3381 183.455 107.472 114.76 134.053 110.022Z"
          fill="#E99C2E"
        />
        <path
          d="M154 275.5C156.858 281.085 170.575 262.71 183.5 260C196.425 257.29 216.846 270.784 217 265"
          stroke="#2F1F0D"
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path
          d="M203.26 258.923C191.427 276.878 174.045 270.733 166.834 265.415C150.399 258.695 128.565 261.571 129.614 281.699C130.452 297.802 139.688 295.479 144.201 292.304C147.874 326.591 171.251 324.389 182.479 319.001C195.818 341.408 203.789 325.53 206.107 314.79C206.458 316.759 210.198 318.936 222.351 311.895C234.504 304.853 231.43 285.898 228.374 277.301C243.385 281.736 241.684 269.342 241.353 261.783C241.021 254.224 218.051 236.479 203.26 258.923Z"
          fill="url(#paint1_linear_4_3232)"
        />
        <path
          d="M146.101 268.229C149.697 271.313 169.426 273.723 184.34 254.812C193.83 262.465 210.513 260.135 218.899 257.794C236.44 267.872 249.277 254.41 251.246 254.06C262.762 247.437 209.614 214.248 186.985 226.915L180.216 231.676L171.233 229.722C145.622 225.653 107.214 275.161 120.309 277.397C130.786 279.187 141.869 272.031 146.101 268.229Z"
          fill="url(#paint2_linear_4_3232)"
        />
        <path
          d="M195.956 180.927C198.56 173.691 217.39 164.41 229.111 176.033"
          stroke="#9F3B1B"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M112.304 196.007C114.908 188.771 133.738 179.49 145.46 191.113"
          stroke="#9F3B1B"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M269.532 230.367C256.633 204.625 243.948 149.202 243.15 133.454L277.232 133.71C278.025 141.475 286.419 174.876 295.662 204.654C307.217 241.877 352.438 250.516 335.415 257.161C318.392 263.805 314.778 296.731 292.89 303.072C271.001 309.413 285.655 262.544 269.532 230.367Z"
          fill="url(#paint3_linear_4_3232)"
        />
        <path
          d="M269.532 230.367C256.633 204.625 243.948 149.202 243.15 133.454L277.232 133.71C278.025 141.475 286.419 174.876 295.662 204.654C307.217 241.877 352.438 250.516 335.415 257.161C318.392 263.805 314.778 296.731 292.89 303.072C271.001 309.413 285.655 262.544 269.532 230.367Z"
          fill="url(#paint4_linear_4_3232)"
        />
        <path
          d="M200.062 68.2849C216.883 56.362 233.175 55.2138 239.219 56.13C240.517 57.6397 241.725 60.7661 242.826 64.9573C253.249 65.9104 269.581 74.634 271.351 83.7085C273.12 92.7831 275.107 116.049 287.359 135.281C283.778 146.143 254.422 151.554 240.192 152.902C236.976 156.822 229.26 154.604 225.737 155.479C206.128 153.74 168.233 133.06 141.965 127.145C161.297 106.946 187.069 77.4939 200.062 68.2849Z"
          fill="url(#paint5_linear_4_3232)"
        />
        <path
          d="M200.334 70.5147C217.156 58.5918 237.892 64.5241 243.935 65.4404C247.931 47.9681 187.837 35.1022 163.022 34.4287C138.206 33.7551 112.043 67.5298 93.2884 79.6339C74.5337 91.738 81.9922 102.823 64.094 119.373C46.1959 135.923 64.0462 144.518 71.4089 178.356C85.3948 204.664 103.904 181.141 117.109 167.905C122.4 166.263 130.284 141.865 142.238 129.375C161.569 109.176 187.341 79.7237 200.334 70.5147Z"
          fill="url(#paint6_linear_4_3232)"
        />
        <ellipse
          cx="132.365"
          cy="217.376"
          rx="24"
          ry="24"
          transform="rotate(-10.1063 132.365 217.376)"
          fill="#FFFFFF"
        />
        <ellipse
          cx="217.031"
          cy="202.285"
          rx="24"
          ry="24"
          transform="rotate(-10.1063 217.031 202.285)"
          fill="#FFFFFF"
        />
        <defs>
          <linearGradient
            id="paint0_linear_4_3232"
            x1="65.4181"
            y1="106.749"
            x2="339.329"
            y2="441.043"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0729167" stopColor="#FFDF9C" />
            <stop offset="0.421875" stopColor="#FFBF3A" />
            <stop offset="0.786458" stopColor="#DE6B00" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_4_3232"
            x1="182.302"
            y1="254.567"
            x2="195.803"
            y2="330.311"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#931818" />
            <stop offset="0.5" stopColor="#9F3B1B" />
            <stop offset="1" stopColor="#D54E23" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_4_3232"
            x1="178.911"
            y1="227.203"
            x2="186.54"
            y2="270.007"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7D2408" />
            <stop offset="0.279426" stopColor="#A54021" />
            <stop offset="1" stopColor="#BE5737" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_4_3232"
            x1="264.286"
            y1="126.893"
            x2="316.684"
            y2="295.691"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#452D8D" />
            <stop offset="0.306617" stopColor="#7D57B5" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_4_3232"
            x1="264.286"
            y1="126.893"
            x2="316.684"
            y2="295.691"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C9A267" />
            <stop offset="0.306617" stopColor="#ECD9B5" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_4_3232"
            x1="194.54"
            y1="66.2986"
            x2="224.013"
            y2="161.246"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D6BD8E" />
            <stop offset="1" stopColor="#EDDAB6" />
          </linearGradient>
          <linearGradient
            id="paint6_linear_4_3232"
            x1="107.949"
            y1="46.1999"
            x2="168.996"
            y2="165.282"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D5B785" />
            <stop offset="0.369792" stopColor="#F0E1C3" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div
        style={{
          top: 205,
          left: 135,
          transform: `rotate(${rotation - 90}deg)`,
        }}
        id="eye1"
        className="absolute w-8 h-8 bg-white"
      >
        <div
          id="eyeball1"
          className="absolute bg-black w-3 h-3 rounded-full bottom-1 left-1/2 -translate-x-1/2"
        />
      </motion.div>
      <motion.div
        style={{
          top: 190,
          left: 222,
          transform: `rotate(${rotation - 90}deg)`,
        }}
        id="eye2"
        className="absolute w-8 h-8 bg-white"
      >
        <div
          id="eyeball2"
          className="absolute bg-black w-3 h-3 rounded-full bottom-1 left-1/2 -translate-x-1/2"
        />
      </motion.div>
      <AnimatePresence>
        {showJokeBox && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute text-black text-center flex items-center justify-center w-[400px] h-[250px] -top-[250px] left-[100px] bg-slate-100 rounded-lg p-8 font-bold text-lg"
          >
            {jokes[jokeIndex.current]}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Khwarizmi;
