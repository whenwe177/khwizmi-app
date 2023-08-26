import React from 'react';
import bg from "../public/bg1.png";

const Error = () => {
  return (
    <div
      style={{
        background: `url(${bg.src}), linear-gradient(180deg, #0E032F 0%, #283472 100%)`,
        backgroundSize: "cover",
      }}
      className="h-screen p-8 flex flex-col items-center gap-3 justify-center"
    >
        <p className="text-white text-2xl font-bold">An error occured...</p>
    </div>
  )
}

export default Error