import React from "react";
import bg from "../public/bg1.png";
import { useLottie } from "lottie-react";
import rocketAnimation from "../public/rocket.json";
import { motion } from "framer-motion";
import Star from "./Star";

const Loading = () => {
  const options = {
    animationData: rocketAnimation,
    loop: true,
    style: { width: 400, height: 400 },
  };

  const { View: Rocket } = useLottie(options);
  return (
    <main
      style={{
        background: `url(${bg.src}), linear-gradient(180deg, #0E032F 0%, #283472 100%)`,
        backgroundSize: "cover",
      }}
      className="pointer-events-none h-screen p-8 flex flex-col items-center gap-3 justify-center"
    >
      <motion.div
        style={{
          opacity: 0.8,
          position: "absolute",
          top: "20%",
          left: "20%",
          x: "-20%",
          y: "-20%",
        }}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{
          rotate: {
            ease: "anticipate",
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      >
        <Star className="h-[120px] w-[120px]" />
      </motion.div>
      <motion.div
        style={{
          opacity: 0.8,
          position: "absolute",
          bottom: "20%",
          right: "5%",
          x: "-10%",
          y: "-10%",
        }}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{
          rotate: {
            ease: "anticipate",
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      >
        <Star className="h-[50px] w-[50px]" />
      </motion.div>
      <motion.div
        style={{
          opacity: 0.8,
          position: "absolute",
          bottom: "10%",
          right: "10%",
          x: "-10%",
          y: "-10%",
        }}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{
          rotate: {
            ease: "anticipate",
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      >
        <Star className="h-[50px] w-[50px]" />
      </motion.div>
      {Rocket}
      <p className="text-white text-2xl font-bold">
        Good things come to those who wait...
      </p>
    </main>
  );
};

export default Loading;
