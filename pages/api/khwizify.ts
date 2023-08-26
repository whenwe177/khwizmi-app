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
        role: "user",
        content: `MATERIAL:${context}`,
      },
      {
        role: "user",
        content: `Analyze the material above and generate a quiz consisting a maximum of 15 question`,
      },
    ],
    functions: [
      {
        name: "do_quiz",
        parameters: {
          type: "object",
          properties: {
            quiz: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: {
                    type: "string",
                    description:
                      "Question based on the material that is not too easy and uses synonyms. Hard questions are preferred",
                  },
                  expected_duration: {
                    type: "number",
                    description:
                      "A generous expected duration needed to complete the question in seconds with a minimum of 25 seconds",
                  },
                  choices: {
                    type: "object",
                    description: "Object containing choices A, B, C, and D. Compound choices are also allowed, for example, Both A and B",
                    properties: {
                      a: {
                        type: "string",
                        description: "Possible answer A for the question",
                      },
                      b: {
                        type: "string",
                        description: "Possible answer B for the question",
                      },
                      c: {
                        type: "string",
                        description: "Possible answer C for the question",
                      },
                      d: {
                        type: "string",
                        description: "Possible answer D for the question",
                      },
                    },
                  },
                  answer: {
                    type: "object",
                    properties: {
                      correct_choice: {
                        type: "string",
                        description: "The correct answer: A, B, C, or, D",
                      },
                      reason: {
                        type: "string",
                        description:
                          "A comprehensive reason on why the correct answer was indeed correct",
                      },
                    },
                  },
                },
              },
              description: "An array consisting a maximum of 15 questions",
            },
          },
        },
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const quiz = JSON.parse(completion.choices[0].message.function_call?.arguments!)

  return res.status(200).json(quiz.quiz);
  return res
    .status(200)
    .json(
      JSON.parse(
        '[{"expected_duration": 60, "question": "Indonesia?", "choices": {"a": "Yes", "b": "Yes","c": "Yes","d": "Yes"}, "answer": {"correct_choice": "a", "reason":"Yes"}}, {"expected_duration": 60, "question": "Indonesian?", "choices": {"a": "Yes", "b": "Yes","c": "Yes","d": "Yes"}, "answer": {"correct_choice": "a", "reason":"Yes"}}]'
      )
    );
}
