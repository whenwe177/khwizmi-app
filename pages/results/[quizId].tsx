import { StudySession } from "@/Quiz";
import { firestore } from "@/firebase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
    staleTime: Infinity
  });

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  return (
    <div>
      <p>Your final score is:</p>
      <h2>{data?.score}</h2>
    </div>
  );
};

ResultPage.auth = true;

export default ResultPage;
