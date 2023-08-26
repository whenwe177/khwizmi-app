import React from "react";
import bg from "@/public/bg1.png";
import Logo from "@/components/Logo";

const LeaderboardPage = () => {
  return (
    <div
      style={{
        background: `url(${bg.src}), linear-gradient(180deg, #0E032F 0%, #283472 100%)`,
        backgroundSize: "cover",
      }}
      className="h-screen p-8 flex flex-col items-center gap-3"
    >
      <div className="flex my-12 items-center gap-3">
        <Logo className="h-[40px] w-[40px]" />
        <p className="text-white text-xl font-semibold">Khwizmi</p>
      </div>
      <h2 className="text-3xl text-white font-bold">Leaderboard</h2>
      <div className="">
        
      </div>
    </div>
  );
};

export default LeaderboardPage;
