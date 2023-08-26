import { Question, StudySession } from "@/Quiz";
import QuizApp from "@/components/Quiz/QuizApp";
import { useAppContext } from "@/context/AppContext";
import { firestore } from "@/firebase";
import { parsePdf } from "@/utils/pdf";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import bg from "@/public/bg1.png";

const QuizPage = () => {
  const router = useRouter();
  const { user } = useAppContext();

  const { mutateAsync } = useMutation({
    mutationFn: async (context: string) => {
      const response = await fetch("/api/khwizify", {
        method: "POST",
        body: JSON.stringify({ context }),
      });
      if (!response.ok) throw new Error(`${response.status}`);
      const questions = await response.json();
      return questions;
    },
    retry: false,
  });

  const studySessionRef = collection(firestore, "study_session");
  const activeStudySessionQuery = query(
    studySessionRef,
    where("ongoing", "==", true),
    where("uid", "==", user!.uid),
    limit(1)
  );

  const { data, isLoading, isError } = useQuery(["studySession"], {
    queryFn: async () => {
      const result = await getDocs(activeStudySessionQuery);
      if (result.size === 0) router.push("/");
      const activeSessions = result.docs;

      const activeSession = activeSessions[0].data() as StudySession;
      if (Date.now() < activeSession.study_end_time.toMillis())
        router.push("/study");

      const content = await parsePdf(
        activeSession.pdf_url,
        activeSession.pages
      );
      const activeSessionID = activeSessions[0].id;
      if (activeSession.quiz == null) {
        const data = await mutateAsync(content);
        const updatedDocument = doc(
          firestore,
          "study_session",
          activeSessionID
        );
        const timeToAccomplishTask = data.reduce(
          (prev: number, current: Question) => current.expected_duration + prev,
          0
        );
        const quizEndTime = Date.now() + timeToAccomplishTask * 1000;
        await updateDoc(updatedDocument, {
          quiz: data,
          quiz_end_time: Timestamp.fromMillis(quizEndTime),
          duration: timeToAccomplishTask,
        });
        activeSession.quiz = data;
        activeSession.quiz_end_time = Timestamp.fromMillis(quizEndTime);
        activeSession.duration = timeToAccomplishTask;
  
      }
      return { activeSession, activeSessionID, length: content.length };
    },
    staleTime: Infinity,
  });

  if (isLoading) return <p>Hello</p>;
  if (isError) return <p>Error</p>;

  return (
    <div
      style={{
        background: `url(${bg.src}), linear-gradient(180deg, #0E032F 0%, #283472 100%)`,
        backgroundSize: "cover",
      }}
      className="h-screen p-8 flex flex-col items-center gap-3"
    >
      <QuizApp
        quiz={data?.activeSession!}
        quizId={data?.activeSessionID!}
        contentLength={data?.length!}
      />

    </div>
  );
};

QuizPage.auth = true;

export default QuizPage;
