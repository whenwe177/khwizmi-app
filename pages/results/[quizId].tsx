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

const ResultPage = () => {
  const router = useRouter();

  const documentRef = doc(firestore, "study_session", router.query.quizId as string);

  const { data, isLoading, isError } = useQuery(["result"], {
    queryFn: async () => {
      const result = await getDoc(documentRef);
      return result.data() as StudySession;
    },
    staleTime: Infinity,
  });
  
  if (isLoading) return ;
  if (isError) return <p>Error</p>;

  return (
    <div
      style={{
        background: `url(${bg.src}), linear-gradient(180deg, #0E032F 0%, #283472 100%)`,
        backgroundSize: "cover",
      }}
      className="h-screen p-12 flex flex-col items-center gap-3"
    >
      <Khwarizmi posX={10} posY={10}/>
      <p>Keep it up!</p>
      <h2>You got {data?.correct_answers}/{data?.quiz?.length}</h2>
      <p>With a score of {data?.score}</p>
      <AccordionListOfQuizzes quiz={data}/>
    </div>
  );
};

ResultPage.auth = true;

export default ResultPage;
