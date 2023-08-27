import React from 'react';
import bg from "../public/bg1.png";

import KhawarizmiSleeping from "@/components/KhwarizmiSleeping";
import { motion } from 'framer-motion';
import Star from './Star';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/router';
import Logo from "@/components/Logo";
import { signInWithPopup } from "firebase/auth";
import { auth, firestore, googleProvider } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface ErrorProps {
  statusCode: number;
  message: string;
}

const Stars = () => {
  return (
    <>
      <motion.div
        style={{ opacity: 0.85, x: 650, y: -200, position: "absolute" }}
      >
        <Star className="h-[250px] w-[250px]" />
      </motion.div>
      <motion.div
        style={{
          opacity: 0.85,
          x: -700,
          y: -200,
          rotate: 90,
          position: "absolute",
        }}
      >
        <Star className="h-[150px] w-[150px]" />
      </motion.div>
      <motion.div
        style={{
          opacity: 0.85,
          x: 250,
          y: 300,
          rotate: 110,
          position: "absolute",
        }}
      >
        <Star className="h-[80px] w-[80px]" />
      </motion.div>
      <motion.div
        style={{
          opacity: 0.85,
          x: -800,
          y: 300,
          rotate: 50,
          position: "absolute",
        }}
      >
        <Star className="h-[80px] w-[80px]" />
      </motion.div>
      <motion.div
        style={{
          opacity: 0.85,
          x: -700,
          y: 400,
          rotate: 50,
          position: "absolute",
        }}
      >
        <Star className="h-[50px] w-[50px]" />
      </motion.div>
      <motion.div
        style={{
          opacity: 0.85,
          x: -500,
          y: 250,
          rotate: 50,
          position: "absolute",
        }}
      >
        <Star className="h-[30px] w-[30px]" />
      </motion.div>
    </>
  );
};

const KhawarizmiSleepingMotion = () => {
  return (
    <>
      <motion.div
        style={{opacity:1, x: 500, y: 120, position: "absolute" }}
      >
        <KhawarizmiSleeping className="h-[480px] w-[480px]" />
      </motion.div>
    </>
  );
};


const Error: React.FC<ErrorProps> = ({message}) => { 
  const { user } = useAppContext();
  const router = useRouter();

  const loginWithGoogle = async () => {
    const user = await signInWithPopup(auth, googleProvider);
    const usersRef = doc(firestore, "user_attributes", user.user.uid);
    const getUser = await getDoc(usersRef);
    if (getUser.data() == null) {
      await setDoc(usersRef, {
        experience: 0,
        name: user.user.displayName,
        photo_url: user.user.photoURL
      })
    }
  };
  
  const goBackHome = async () => {
    if (!user) {
      await loginWithGoogle();
    }

    router.push("/");
  }
  
  return (
  
  <div 
  style={{
    background: `url(${bg.src}), linear-gradient(180deg, #0E032F 0%, #283472 100%)`,
    backgroundSize: "cover",
  }}
  className="h-screen p-8 flex flex-col items-center gap-3 justify-center"
  >
    <div className="flex items-center gap-4 border-b-2 pb-1">
          <Logo className="h-[32px] w-[32px]" />
          <h1 className="text-white text-1xl font-semibold">Khwizmi</h1>
    </div>
    ``
    <h1 className="text-white text-8xl font-bold">Uh oh!</h1>
    <p className="text-white text-2xl font-bold">{message}</p>
    <br></br>
    <Button className="bg-yellow1 hover:bg-yellow-600 text-black font-bold" onClick={goBackHome}>
          Go Back to Home
    </Button>
    <Stars />
    <KhawarizmiSleepingMotion />

  </div>
  
);
};

export default Error;

