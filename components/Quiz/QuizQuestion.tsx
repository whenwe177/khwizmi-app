import React, { Dispatch, SetStateAction } from 'react';

interface Props {
    question: QuizQuestion;
    idx: number;
    setUserAnswers: Dispatch<SetStateAction<Choices | null[]>>
}

const QuizQuestion = ({ question, idx, setUserAnswers } : Props) => {
  const { choices, question: questionPrompt} = question;
  const choicesList = Object.entries(choices);
  
    return (
    <div>
        <h1>{ questionPrompt }</h1>
        <div className="flex flex-col">
            {
                choicesList.map(([choice, answer]) => <button onClick={() => setUserAnswers(prev => {
                    //@ts-ignore
                    const result = [...prev];
                    result[idx] = choice;
                    return result;
                })} className="flex">
                    <h1>{ choice }</h1>
                    <p>{ answer }</p>
                </button>)
            }
        </div>
    </div>
  )
}

export default QuizQuestion