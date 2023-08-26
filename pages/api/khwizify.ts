// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

type Data = {
  quiz: string;
};

const openai = new OpenAI();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { context } = JSON.parse(req.body);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an expert quiz maker who can create effective quizzes that test the knowledge of students about any material",
      },
      {
        role: "system",
        content:
          "I am going to send you material prefixed with 'CONTEXT:' and you are expected to create the quiz based on the given material",
      },
      {
        role: "user",
        content: `CONTEXT:${context}`,
      },
      {
        role: "user",
        content: `Please generate a quiz, which is an array of JSON objects each with the following structure:
      [
        {
          "question": // string (the question should not be too hard or too easy, try using synonyms)
          "expected_duration": // number (how long you think (in seconds) the question should take to solve)
          "choices": { // (make sure the choices are concise and not obvious)
                  "a": // string,
                  "b": // string,
                  "c": // string,
                  "d": // string,
                }
           "answer": {
             correct_choice: // string (either "a", "b", "c", or "d")
                reason: // string (give the reason on why the correct choice is indeed correct)
            }
        },
        ...
      ]
      Return the array ONLY, and generate at most 15 questions
        `,
      },
      { role: "assistant", content: "Sure! Here's your array of JSON objects" },
    ],
    model: "gpt-3.5-turbo",
    n: 1,
  });

  return res
    .status(200)
    .json(JSON.parse(completion.choices[0].message.content || ""));
  return res
    .status(200)
    .json(
      JSON.parse(
        '[{"expected_duration": 60, "question": "Indonesia?", "choices": {"a": "Yes", "b": "Yes","c": "Yes","d": "Yes"}, "answer": {"correct_choice": "a", "reason":"Yes"}}, {"expected_duration": 60, "question": "Indonesian?", "choices": {"a": "Yes", "b": "Yes","c": "Yes","d": "Yes"}, "answer": {"correct_choice": "a", "reason":"Yes"}}]'
      )
    );
}
