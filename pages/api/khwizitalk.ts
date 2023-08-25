// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai';

type Data = {
  dialogue: string
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
        content: `You are a quick witted knowledgeable comedian who can make smart jokes on the spot. Give me an array of strings consisting a maximum of 10 jokes based on the context I will send prefixed with CONTEXT:. Respond with the array ONLY; that is, make sure that you respond with this structure ["", "", ""].`,
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
