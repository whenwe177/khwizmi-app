// pages/results/[quizId].tsx
import React from "react";
import { useRouter } from "next/router";
import { StudySession } from "@/Quiz";
import { firestore } from "@/firebase";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import AccordionListOfQuizzes from "@/components/AccordionListOfQuizzes";
import bg from "@/public/bg1.png";
import Khwarizmi from "@/components/Khwarizmi";
import { MotionValue } from "framer-motion";
import Error from "@/components/Error";

const ResultPage = () => {
  const router = useRouter();

  const documentRef = doc(
    firestore,
    "study_session",
    router.query.quizId as string
  );

  const { data, isLoading, isError } = useQuery(["result"], {
    queryFn: async () => {
      const result = await getDoc(documentRef);
      return result.data() as StudySession;
    },
    staleTime: Infinity,
  });

  if (isLoading) return;
  if (isError) return <Error message="An error has occured."/>;

  return (
    <div
      style={{
        background: `url(${bg.src}), linear-gradient(180deg, #0E032F 0%, #283472 100%)`,
        backgroundSize: "cover",
      }}
      className="min-h-screen p-12 flex flex-col items-center gap-3"
    >
      <h1 className="text-white font-bold text-5xl">Keep it up!</h1>
      <div className="h-[400px] relative flex items-center">
        <Khwarizmi posX={0} posY={0} width={400} height={400} position={"relative" as any}/>
        <div
          className=" bg-slate-100 py-4 px-4 w-80 h-fit flex flex-col gap-2 rounded-md drop-shadow-lg"
        >
          <div className="box absolute w-8 h-8 bg-slate-100 top-12 -left-2 rotate-45 -z-10"></div>
          <h1 className="text-lg">
            Congrats! You got{" "}
            <span className="font-bold text-blue-700">
              {data?.correct_answers}/{data?.quiz?.length}
            </span>{" "}
            correct!
          </h1>
          <div className="flex flex-col">
            <p>XP gained: </p>
            <h1 className="text-4xl font-bold">+{data.score}</h1>
          </div>
        </div>
      </div>

      <AccordionListOfQuizzes quiz={data} />
    </div>
  );
};

ResultPage.auth = true;

export default ResultPage;
