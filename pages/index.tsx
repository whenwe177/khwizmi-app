import Logo from "@/components/Logo";
import React from "react";
import Image from "next/image";

const Home = () => {
  return (
    <main
      style={{
        background: "linear-gradient(180deg, #0E032F 0%, #283472 100%)",
      }}
      className="min-h-screen w-full overflow-auto"
    >
      <div className="h-40 mt-52 flex items-center justify-center gap-4">
        <Logo className="h-[80px] w-[82px]" />
        <h1 className="text-white text-7xl font-semibold">Khwizmi</h1>
      </div>
      <div
        className="w-full h-screen absolute top-0 pointer-events-none"
        style={{
          background: 'url("bg1.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "150px",
        }}
      />
    </main>
  );
};

export default Home;
