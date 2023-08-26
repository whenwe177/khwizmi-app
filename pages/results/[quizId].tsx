import { StudySession } from "@/Quiz";
import { firestore } from "@/firebase";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";

const ResultPage = () => {
  const router = useRouter();
  const documentRef = doc(
    firestore,
    "study_session",
    router.query.quizId as string
  );
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const result = await getDoc(documentRef);
      return result.data() as StudySession;
    },
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
