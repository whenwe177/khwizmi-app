import React, { useEffect, useRef, useState } from "react";
import QuizQuestion from "./QuizQuestion";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import { Choices, StudySession } from "@/Quiz";
import { useRouter } from "next/router";

interface Props {
  quiz: StudySession;
  quizId: string;
}

interface CountdownProps {
  timestamp: Timestamp;
  quizId: string;
}

const Countdown: React.FC<CountdownProps> = ({ timestamp, quizId }) => {
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
        await updateDoc(studySessionRef, {
            ongoing: false
        });
        router.push("/results");
    }

    invalidateQuiz();
  }, [delta])
  return (
    <div>
      <p>
        {`${Math.floor(delta / 60)}`.padStart(2,"0")}:{`${delta % 60}`.padStart(2,"0")}
      </p>
    </div>
  );
};

const Quiz: React.FC<Props> = ({ quiz, quizId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Choices | null[]>(
    quiz.answers ?? quiz.quiz?.map(() => null)!
  );

  const studySessionRef = doc(firestore, "study_session", quizId);
  const onUserAnswerChange = async (idx: number, choice: Choices) => {
    //@ts-ignore
    const results = [...userAnswers];
    results[idx] = choice;
    setUserAnswers(results);
    await updateDoc(studySessionRef, {
      answers: results
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
        <Countdown timestamp={quiz.quiz_end_time!} quizId={quizId}/>
      </div>
    </>
  );
};

export default Quiz;
