import { Choices, StudySession } from "@/Quiz";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import React from "react";
import Check from "./Svg/Check";
import Cross from "./Svg/Cross";

interface Props {
  quiz: StudySession;
}

const AccordionListOfQuizzes = ({ quiz }: Props) => {
  return (
    <Accordion
      className="w-full rounded-lg overflow-hidden"
      type="single"
      collapsible
    >
      {quiz.quiz?.map((question, idx) => (
        <AccordionItem value={JSON.stringify(question)}>
          <AccordionTrigger
            className={`px-5 py-4 text-lg font-bold flex gap-2 bg-slate-50`}
          >
            <div>
              {quiz.answers?.[idx] === question.answer.correct_choice ? (
                <Check className="w-10 h-10" fill="#96A630" />
              ) : (
                <Cross className="w-10 h-10" fill="#D60073" />
              )}
            </div>
            <p>{question.question}</p>
          </AccordionTrigger>
          <AccordionContent className={`bg-slate-50`}>
            <div className={`p-4 flex flex-col text-base`}>
                <p><span className="font-bold">Expected Answer</span>: {question.choices[question.answer.correct_choice]}</p>
                <p><span className="font-bold">Your Answer</span>: {quiz.answers?.[idx] ? question.choices[quiz.answers?.[idx]! as Choices] :  "Not answered"}</p>
                <p>{ question.answer.reason }</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionListOfQuizzes;
