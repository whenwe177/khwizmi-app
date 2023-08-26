import React, { useEffect, useRef, useState } from "react";
import QuizQuestion from "./QuizQuestion";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import { Choices, StudySession } from "@/Quiz";
import router, { useRouter } from "next/router";
import { calculateScore } from "@/utils/calculateScore";

interface Props {
  quiz: StudySession;
  quizId: string;
  contentLength: number;
}

interface CountdownProps {
  timestamp: Timestamp;
  duration: number;
  quizId: string;
  contentLength: number;
  answerPercentage: number;
}

const Countdown: React.FC<CountdownProps> = ({
  timestamp,
  duration,
  quizId,
  contentLength,
  answerPercentage,
}) => {
  const router = useRouter();
  const [delta, setDelta] = useState(
    Math.floor((timestamp.toMillis() - Date.now()) / 1000)
  );
  const intervalRef = useRef<NodeJS.Timeout | null>();
  const decrementTimer = () => setDelta((prev) => prev - 1);

  useEffect(() => {
    intervalRef.current = setInterval(decrementTimer, 1000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  useEffect(() => {
    if (delta > 0) return;
    const studySessionRef = doc(firestore, "study_session", quizId);

    const invalidateQuiz = async () => {
      const score = calculateScore(duration, contentLength, answerPercentage);
      await updateDoc(studySessionRef, {
        ongoing: false,
        score,
      });
      router.push(`/results/${quizId}`);
    };

    invalidateQuiz();
  }, [delta]);
  return (
    <div>
      <p>
        {`${Math.floor(delta / 60)}`.padStart(2, "0")}:
        {`${delta % 60}`.padStart(2, "0")}
      </p>
    </div>
  );
};

const Quiz: React.FC<Props> = ({ quiz, quizId, contentLength }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(Choices | null)[]>(
    (quiz.answers as (Choices | null)[]) ?? quiz.quiz?.map(() => null)!
  );
  const router = useRouter();

  const invalidateQuiz = async () => {
    const score = calculateScore(
      quiz.duration!,
      contentLength,
      answerPercentage
    );
    await updateDoc(studySessionRef, {
      ongoing: false,
      score,
    });
    router.push(`/results/${quizId}`);
  };

  const answerPercentage =
    userAnswers.reduce((prev, current, idx) => {
      const correctAnswer = quiz.quiz?.[idx].answer.correct_choice;
      if (current === correctAnswer) return prev + 1;
      return prev;
    }, 0) / userAnswers.length;

  const studySessionRef = doc(firestore, "study_session", quizId);
  const onUserAnswerChange = async (idx: number, choice: Choices) => {
    //@ts-ignore
    const results = [...userAnswers];
    results[idx] = choice;
    setUserAnswers(results);
    await updateDoc(studySessionRef, {
      answers: results,
    });
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-col">
          {quiz.quiz?.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentQuestion(idx)}>
              {idx + 1}.
            </button>
          ))}
        </div>
        <QuizQuestion
          key={currentQuestion}
          question={quiz.quiz?.[currentQuestion]!}
          idx={currentQuestion}
          onUserAnswerChange={onUserAnswerChange}
        />
        <Countdown
          timestamp={quiz.quiz_end_time!}
          duration={quiz.duration!}
          quizId={quizId}
          contentLength={contentLength}
          answerPercentage={answerPercentage}
        />
        <button onClick={invalidateQuiz}>Finish</button>
      </div>
    </>
  );
};

export default Quiz;
