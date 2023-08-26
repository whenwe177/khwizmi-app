import Logo from "@/components/Logo";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import Star from "@/components/Star";
import { signInWithPopup } from "firebase/auth";
import { auth, firestore, googleProvider } from "@/firebase";
import Google from "@/components/Svg/Google";
import { useRouter } from "next/router";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const Stars = () => {
  return (
    <>
      <motion.div
        style={{ opacity: 0.85, x: 650, y: -100, position: "absolute" }}
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
          x: 300,
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

const Home = () => {
  const { user } = useAppContext();
  const router = useRouter();

  const loginWithGoogle = async () => {
    const user = await signInWithPopup(auth, googleProvider);
    const usersRef = doc(firestore, "user_attributes", user.user.uid);
    const getUser = await getDoc(usersRef);
    if (getUser.data() == null) {
      await setDoc(usersRef, {
        experience: 0,
        name: user.user.displayName
      })
    }
  };

  const logout = async () => {
    await auth.signOut();
  };

  const startLearning = async () => {
    if (!user) {
      await loginWithGoogle();
    }

    router.push("/upload");
  }

  return (
    <main
      style={{
        background: "linear-gradient(180deg, #0E032F 0%, #283472 100%)",
      }}
      className="min-h-screen w-full overflow-auto flex flex-col items-center justify-center"
    >
      <Button className="absolute top-4 right-4 bg-transparent hover:bg-transparent border-2 border-white" onClick={user ? logout : loginWithGoogle}>
        {user ? <p>Logout</p> : <div className="flex items-center gap-2"><Google fill="white" width={15}/> Login with Google</div>}
      </Button>
      <motion.div
        initial={{ y: -15 }}
        animate={{ y: 0 }}
        className="h-40 flex flex-col items-center justify-center"
      >
        <div className="flex items-center gap-4 border-b-2 pb-1">
          <Logo className="h-[80px] w-[82px]" />
          <h1 className="text-white text-7xl font-semibold">Khwizmi</h1>
        </div>
        <p className="text-white tracking-widest">
          YOUR A.I POWERED STUDY PARTNER
        </p>
      </motion.div>
      <h2 className="text-white text-3xl mb-12">
        The future of education is here.
      </h2>
        <Button className="bg-yellow1 hover:bg-yellow-600 text-black font-bold" onClick={startLearning}>
          Start Learning
        </Button>
      <div
        className="w-full h-screen fixed top-0 pointer-events-none"
        style={{
          background: 'url("bg1.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "150px",
        }}
      />
      <Stars />
    </main>
  );
};

export default Home;
