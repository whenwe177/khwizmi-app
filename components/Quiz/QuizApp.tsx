import React, { useEffect, useRef, useState } from "react";
import QuizQuestion from "./QuizQuestion";

interface Props {
  quiz: QuizQuestion[];
}

const Quiz: React.FC<Props> = ({ quiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Choices | null[]>(quiz.map(() => null));

  useEffect(() => {
  }, []);

  return (
    <div className="flex">
      <div className="flex flex-col">
        {quiz.map((_, idx) => (
          <button key={idx} onClick={() => setCurrentQuestion(idx)}>{idx + 1}.</button>
        ))}
      </div>
      <QuizQuestion key={currentQuestion} question={quiz[currentQuestion]} idx={currentQuestion} setUserAnswers={setUserAnswers}/>
        <p>{userAnswers}</p>
    </div>
  );
};

export default Quiz;
