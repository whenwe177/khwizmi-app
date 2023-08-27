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
  // const { context } = JSON.parse(req.body);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a quick witted knowledgeable comedian who can make smart jokes on the spot.`,
      },
      {
        role: "user",
        content: `CONTEXT:There is a fundamental quantity called the Fisher information matrix (Ly et al.,
          2017). The Fisher information matrix determines the characteristics of statis-
          tical estimation and hypothetical testing. The derivatives of log-likelihood are
          called the score function. The Fisher information matrix is defined as the vari-
          ance of the score function. For now, it can be said that the Fisher information is
          something like the amount of information obtained from observations. When a
          parameter is unidimensional (multi-dimensional), we call the Fisher information
          (matrix).
          The most important example which implies the importance of the Fisher in-
          formation matrix for the present paper is that the inverse of Fisher information
          (matrix) can predict variance (covariance matrix) of the Maximum Likelihood
          estimator (MLE; Chang, 2015). Higher Fisher information leads to higher es-
          timation precision (lower variance of estimation). Further, the example which
          uses the Fisher information matrix directly in psychological field is Comput-
          erized adaptive testing (CAT; Weiss & Kingsbury, 1984; Segall, 2004; Meijer
          & Nering, 1999; van der Linden, 2018; van der Linden, 1998). In CAT, the
          Fisher information (matrix) is used for selecting stimuli (e.g., quiz of an educa-
          1
          tional test, an item for questionnaire, reward and reward probability for decision
          making task) adaptively and optimally.
          Although the Fisher information matrix is a fundamental and important
          quantity in statistics, there are few cases where it is used effectively in psyc hol-
          ogy or psychological statistics. It will be useful for determining the experimental
          design, especially selecting stimuli, with the optimal and objective procedures.
          In our understanding, there are some reasons why the Fisher information
          matrix is not often used in psychology. The first reason is that researchers do
          not recognize the value of the Fisher information matrix. The second reason
          is that researchers will have some hurdles in deriving its analytical solution.
          Therefore, this paper explains why the Fisher information matrix is important,
          especially for statistical inference in section 2. Then this paper explains how
          to calculate the Fisher information matrix with some calculation examples in
          section 3. In addition, this paper provides R code example in section 4`,
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
