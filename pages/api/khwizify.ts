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
        content:
          "Use the generate_quiz function to create a perfect quiz (minimum of 8 and maximum of 15 questions) just like what you are known for. Adhering to the description of the parameters is crucial.",
      },
    ],
    function_call: { name: "generate_quiz" },
    functions: [
      {
        name: "generate_quiz",
        description: "Generate a comprehensive quiz from the input material",
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
                      "An expected duration, between 25-100 seconds, needed to answer the question based on the difficulty.",
                  },
                  choices: {
                    type: "object",
                    description:
                      "Object containing choices A, B, C, and D. Compound choices are also allowed, for example, Both A and B. Duplicate choices are not allowed",
                    properties: {
                      a: {
                        type: "string",
                        description:
                          "answer option A (cannot be the same as B, C, or D)",
                      },
                      b: {
                        type: "string",
                        description:
                          "answer option B (cannot be the same as A, C, or D)",
                      },
                      c: {
                        type: "string",
                        description:
                          "answer option C (cannot be the same as A, B, or D)",
                      },
                      d: {
                        type: "string",
                        description:
                          "answer option D (cannot be the same as A, B, or C)",
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
              description:
                "An array consisting a maximum of 15 questions and a minimum of 8 questions",
            },
          },
          required: ["quiz"],
        },
      },
    ],

    model: "gpt-3.5-turbo",
  });
  let quiz: any;

  quiz = JSON.parse(completion.choices[0].message.function_call?.arguments!);

  for (let question of quiz.quiz) {
    if (question.expected_duration >= 7 && question.expected_duration < 12) {
      question.expected_duration *= 3;
    } else if (
      question.expected_duration === 6 ||
      question.expected_duration === 5
    ) {
      question.expected_duration *= 5;
    } else if (
      question.expected_duration === 4 ||
      question.expected_duration === 3
    ) {
      question.expected_duration *= 10;
    } else if (question.expected_duration <= 2) {
      question.expected_duration *= 15;
    }
  }

  return res.status(200).json(quiz.quiz);
  return res
    .status(200)
    .json(
      JSON.parse(
        '[{"expected_duration": 60, "question": "Indonesia?", "choices": {"a": "Yes", "b": "Yes","c": "Yes","d": "Yes"}, "answer": {"correct_choice": "a", "reason":"Yes"}}, {"expected_duration": 60, "question": "Indonesian?", "choices": {"a": "Yes", "b": "Yes","c": "Yes","d": "Yes"}, "answer": {"correct_choice": "a", "reason":"Yes"}}]'
      )
    );
}
