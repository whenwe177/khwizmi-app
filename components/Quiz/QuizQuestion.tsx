import { Choices, Question } from "@/Quiz";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  question: Question;
  idx: number;
  onUserAnswerChange: (idx: number, choice: Choices) => void;
}

const QuizQuestion = ({ question, idx, onUserAnswerChange }: Props) => {
  const { choices, question: questionPrompt } = question;
  const choicesList = Object.entries(choices).sort(
    (a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0)
  );

  return (
    <div>
      <h1>{questionPrompt}</h1>
      <div className="flex flex-col">
        {choicesList.map(([choice, answer]) => (
          <button
            key={JSON.stringify([choice, answer])}
            onClick={() => onUserAnswerChange(idx, choice as Choices)}
            className="flex"
          >
            <h1>{choice}</h1>
            <p>{answer}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
