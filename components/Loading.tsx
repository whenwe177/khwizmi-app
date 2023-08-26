import React from "react";
import bg from "../public/bg1.png";
import { useLottie } from "lottie-react";
import rocketAnimation from "../public/rocket.json";

const Loading = () => {
  const options = {
    animationData: rocketAnimation,
    loop: true,
    style: { width: 400, height: 400}
  };

  const {View: Rocket} = useLottie(options);
  return (
    <div
      style={{
        background: `url(${bg.src}), linear-gradient(180deg, #0E032F 0%, #283472 100%)`,
        backgroundSize: "cover",
      }}
      className="h-screen p-8 flex flex-col items-center gap-3 justify-center"
    >
        { Rocket }
        <p className="text-white text-2xl font-bold">Good things come to those who wait...</p>
    </div>
  );
};

export default Loading;
