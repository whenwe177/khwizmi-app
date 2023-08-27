// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { jsonrepair } from "jsonrepair";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

type Data = {
  dialogue: string;
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
        content: `You are a quick witted knowledgeable comedian who can make smart jokes on the spot.`,
      },
      {
        role: "user",
        content: `CONTEXT:${context}`,
      },
      {
        role: "user",
        content: "Use the generate_jokes function to create an array of jokes based on the context above containing a minimum of 5 jokes"
      },
    ],
    functions: [
      {
        name: "generate_jokes",
        parameters: {
          type: "object",
          properties: {
            jokes: {
              type: "array",
              description: "Array of jokes based on the context",
              items: {
                type: "string",
              },
            },
          },
        },
      },
    ],
    model: "gpt-3.5-turbo",
    n: 1,
  });

  return res.status(200).json(JSON.parse(jsonrepair(completion.choices[0].message.function_call?.arguments!)).jokes)
  return res.status(200).json(JSON.parse('["Dummy Joke"]'));
}
