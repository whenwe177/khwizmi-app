import { Question, StudySession } from "@/Quiz";
import QuizApp from "@/components/Quiz/QuizApp";
import { firestore } from "@/firebase";
import { useMutation } from "@tanstack/react-query";
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
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const QuizPage = () => {
  const [quiz, setQuiz] = useState<StudySession | null>(null);
  const [quizId, setQuizId] = useState("");
  const [isError, setError] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch("/api/khwizify", {
        method: "POST",
        body: JSON.stringify({ content }),
      });
      if (!response.ok) throw new Error(`${response.status}`);
      const questions = await response.json();
      return questions;
    },
  });

  const studySessionRef = collection(firestore, "study_session");
  const activeStudySessionQuery = query(
    studySessionRef,
    where("ongoing", "==", true),
    limit(1)
  );

  useEffect(() => {
    const getStudySession = async () => {
      try {
        const content = "";
        const result = await getDocs(activeStudySessionQuery);
        const activeSessions = result.docs;

        const activeSession = activeSessions[0].data() as StudySession;
        const activeSessionID = activeSessions[0].id;

        if (activeSession.quiz == null) {
          const data = await mutateAsync(content);
          const updatedDocument = doc(
            firestore,
            "study_session",
            activeSessionID
          );
          const timeToAccomplishTask = data.reduce(
            (prev: number, current: Question) =>
              current.expected_duration + prev,
            0
          );
          const quizEndTime = Date.now() + timeToAccomplishTask * 1000;
          await updateDoc(updatedDocument, {
            quiz: data,
            quiz_end_time: Timestamp.fromMillis(quizEndTime),
          });
          activeSession.quiz = data;
          activeSession.quiz_end_time = Timestamp.fromMillis(quizEndTime);
        }
        setQuiz(activeSession);
        setQuizId(activeSessionID);
      } catch (err) {
        setError(true);
        console.error(err);
      }
    };

    getStudySession();
  }, []);

  
  if (isError) return <p>Error</p>;

  const isLoading = quiz?.quiz == null || quiz?.quiz_end_time == null
  
  if (isLoading) return <p>Loading</p>;

  return (
    <div>
      <QuizApp quiz={quiz!} quizId={quizId} />
    </div>
  );
};

QuizPage.auth = true;

export default QuizPage;
