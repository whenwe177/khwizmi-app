import { Choices, Question } from "@/Quiz";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import Star from "../Svg/Star";
import Triangle from "../Svg/Triangle";
import Circle from "../Svg/Circle";
import Moon from "../Svg/Moon";

interface Props {
  question: Question;
  idx: number;
  onUserAnswerChange: (idx: number, choice: Choices) => void;
  chosenAnswer: Choices;
}

const QuizQuestion = ({
  question,
  idx,
  onUserAnswerChange,
  chosenAnswer,
}: Props) => {
  const { choices, question: questionPrompt } = question;

  return (
    <div className="text-white w-full flex flex-col items-center">
      <p className="text-xl">{question.question}</p>
      <div className="grid grid-cols-2 grid-rows-2 my-3 w-full place-items-center gap-y-4 gap-x-8">
        <Button
          onClick={() => onUserAnswerChange(idx, "a")}
          className={clsx(
            "bg-blue2",
            "hover:bg-blue3",
            chosenAnswer === "a" && "drop-shadow-[0_5px_5px_#7cafff]",
            "w-full",
            "h-fit",
            "flex",
            "justify-start",
            "px-8",
            "py-4",
            "gap-4",
            "transition-all"
          )}
        >
          <Star className="w-[50px] h-[50px]" fill="#7cafff" />
          <p className="text-white text-lg font-bold">{choices.a}</p>
        </Button>
        <Button
          onClick={() => onUserAnswerChange(idx, "b")}
          className={clsx(
            "bg-yellow2",
            "hover:bg-yellow3",
            chosenAnswer === "b" && "drop-shadow-[0_5px_5px_#FFE483]",
            "w-full",
            "h-fit",
            "flex",
            "justify-start",
            "px-8",
            "py-4",
            "gap-4",
            "transition-all"
          )}
        >
          <Circle className="w-[50px] h-[50px]" fill="#FFE483" />
          <p className="text-white text-lg font-bold">{choices.a}</p>
        </Button>
        <Button
          onClick={() => onUserAnswerChange(idx, "c")}
          className={clsx(
            "bg-green1",
            "hover:bg-green3",
            chosenAnswer === "c" && "drop-shadow-[5px_5px_5px_#CAEA0E]",
            "w-full",
            "h-fit",
            "flex",
            "justify-start",
            "px-8",
            "py-4",
            "gap-4",
            "transition-all"
          )}
        >
          <Triangle className="w-[50px] h-[50px]" fill="#CAEA0E" />
          <p className="text-white text-lg font-bold">{choices.c}</p>
        </Button>
        <Button
          onClick={() => onUserAnswerChange(idx, "d")}
          className={clsx(
            "bg-pink1",
            "hover:bg-pink3",
            chosenAnswer === "d" && "drop-shadow-[5px_5px_5px_#FF84C6]",
            "w-full",
            "h-fit",
            "flex",
            "justify-start",
            "px-8",
            "py-4",
            "gap-4",
            "transition-all"
          )}
        >
          <Moon className="w-[50px] h-[50px]" fill="#FF84C6" />
          <p className="text-white text-lg font-bold">{choices.c}</p>
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;
