// pages/results/[quizId].tsx
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { StudySession } from "@/Quiz";
import { firestore } from "@/firebase";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

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

  console.log(data);
  
  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  return (
    <div>
      <p>Keep it up!</p>
      <h2>You got {data?.correct_answers}/{data?.quiz?.length}</h2>
      <p>With a score of {data?.score}</p>
    </div>
  );
};

ResultPage.auth = true;

export default ResultPage;
