// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai';

type Data = {
  quiz: string
}

const openai = new OpenAI();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { context } = JSON.parse(req.body);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an expert quiz maker who is able to create quizzes that effectively tests the knowledge of learners. Your job is to create a quiz and return each question in a JSON format with the following structure
      {
        expected_duration: ...,
        question: ...,
        choices: {
          a: ...,
          b: ...,
          c: ...,
          d: ...,
        }
        answer: {
          correct_choice: ...,
          reason: ...
        }
      }. The answer property will consist of correct_choice and reason. You will provide the correct choice ('a', 'b', 'c', 'd') in the correct_choice property whilst also providing the reason on why it is correct. Each choice should be concise. Depending on how hard the question is give an expected_duration in seconds. You will be given a block of text as context, prefixed with 'CONTEXT:'. Create a list of questions based on the text and return a maximum of 15 questions for the quiz. Return the list of questions only and no other text.`,
      },
      {
        role: "user",
        content: `CONTEXT:${context}`,
      },
    ],
    model: "gpt-3.5-turbo",
    n: 1,
  });

  return res.status(200).json(JSON.parse(completion.choices[0].message.content || ''))
}
