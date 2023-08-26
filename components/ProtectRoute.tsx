import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProtectRoute = ({ children }: React.PropsWithChildren) => {
  const { user } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  if (!user)
    return (
      <main
        style={{
          background: "linear-gradient(180deg, #0E032F 0%, #283472 100%)",
        }}
        className="min-h-screen w-full overflow-auto flex flex-col items-center justify-center"
      >
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
  return children;
};

export default ProtectRoute;
