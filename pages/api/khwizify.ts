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
  // const { context } = JSON.parse(req.body);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an expert quiz maker who can create effective quizzes that test the knowledge of students about any material",
      },
      {
        role: "user",
        content: `MATERIAL:The Fisher information matrix: A tutorial for
        calculation for decision making models
        Kazuya Fujita, Kensuke Okada, Kentaro Katahira
        Abstract
        Measuring trait parameters with high estimation precision is important in psychology. In terms of estimation precision, there is a fundamental quantity, the Fisher information, in statistics. This paper introduces
        the Fisher information from the perspective of estimation precision and
        experimental stimulus selection. This paper explained the asymptotic efficiency of the maximum likelihood estimator to explain the importance
        of the Fisher information in statistics. Then, this paper introduced Computerized adaptive testing (CAT), which uses the Fisher information for
        stimulus selection as an example of application in psychology. In addition,
        we recommended CAT for cognitive models due to the extent of the effect
        and low cost of CAT. In section 3, this paper explained how to calculate
        the Fisher information of decision making models. In section 4, this paper
        showed simulation example to explain how to use the Fisher information
        for selecting stimuli in cognitive experiment.
        1 Introduction
        There is a fundamental quantity called the Fisher information matrix (Ly et al.,
        2017). The Fisher information matrix determines the characteristics of statistical estimation and hypothetical testing. The derivatives of log-likelihood are
        called the score function. The Fisher information matrix is defined as the variance of the score function. For now, it can be said that the Fisher information is
        something like the amount of information obtained from observations. When a
        parameter is unidimensional (multi-dimensional), we call the Fisher information
        (matrix).
        The most important example which implies the importance of the Fisher information matrix for the present paper is that the inverse of Fisher information
        (matrix) can predict variance (covariance matrix) of the Maximum Likelihood
        estimator (MLE; Chang, 2015). Higher Fisher information leads to higher estimation precision (lower variance of estimation). Further, the example which
        uses the Fisher information matrix directly in psychological field is Computerized adaptive testing (CAT; Weiss & Kingsbury, 1984; Segall, 2004; Meijer
        & Nering, 1999; van der Linden, 2018; van der Linden, 1998). In CAT, the
        Fisher information (matrix) is used for selecting stimuli (e.g., quiz of an educa1
        tional test, an item for questionnaire, reward and reward probability for decision
        making task) adaptively and optimally.
        Although the Fisher information matrix is a fundamental and important
        quantity in statistics, there are few cases where it is used effectively in psyc hology or psychological statistics. It will be useful for determining the experimental
        design, especially selecting stimuli, with the optimal and objective procedures.
        In our understanding, there are some reasons why the Fisher information
        matrix is not often used in psychology. The first reason is that researchers do
        not recognize the value of the Fisher information matrix. The second reason
        is that researchers will have some hurdles in deriving its analytical solution.
        Therefore, this paper explains why the Fisher information matrix is important,
        especially for statistical inference in section 2. Then this paper explains how
        to calculate the Fisher information matrix with some calculation examples in
        section 3. In addition, this paper provides R code example in section 4.
        2 The importance of the Fisher information matrix
        2.1 Maximum likelihood estimation
        This section check prerequisite knowledge, including probability density function, independent and identically distribution, likelihood function, and maximum likelihood (ML) estimation. If you are not familiar with them, you can
        refer Myung (2003). This section is based on his tutorial article.
        Let y = (y1, ..., yN ) be N participants (or trials) observations. Probability
        density function (pdf) provides probability of observation yi
        , p(yi
        |ξ), where ξ
        are parameters. For instance, normal distribution with mean µ and variance σ
        2
        is defined with below pdf:
        p(yi
        |µ, σ2
        ) = 1
        √
        2πσ2
        exp(−
        1
        2σ
        2
        (yi − µ)
        2
        ). (1)
        Observation y is usually assumed independent and identically distributed, which
        is represented by i.i.d. The assumption that y is generated independent and
        identically distribution means
        p(y1, ..., yN |ξ) = p(y1|ξ)· · · p(yN |ξ), (2)
        which indicates joint distribution, p(y1, ..., yN |ξ), can be calculated with the
        products of marginal distribution, p(yi
        |ξ).
        Let L(ξ|y) be likelihood function which is calculated with pdf (e.g., equation
        (1)). Maximum likelihood estimator (MLE) is defined by
        ˆξ = arg max
        ξ
        L(ξ|y) (3)
        where arg maxξ provides argument of maximum likelihood. Therefore, MLE
        can be estimated by solving
        2
        ∂
        ∂ξ
        log L(ξ|y) = 0 (4)
        where ∂
        ∂ξ
        is differential w.r.t. ξ.
        2.2 Asymptotic characteristic of ML
        To understand the importance of the Fisher information, this section explains
        the basic fact in statistics, unbiased estimator, information inequality (CramerRao inequality), and asymptotic normality of MLE.
        Estimation is to map some (real) values from observed data from statistical perspective. There are many candidate as estimation method. Let ξ(χ)
        be estimator where χ is observation pattern. For extreme example, constant
        function which map a specific value regardless of observed data can be treated
        as a estimator. We have to evaluate the goodness of the estimation method.
        One of the evaluation criteria is mean square error (MSE). Let us assume
        random variable xi
        is generated by distribution having pdf, p(x|ξ
        ∗
        ), with true
        parameter value ξ
        ∗
        . Although for simplicity parameter ξ is assumed unidimensional, the case parameters are multidimensional is the same. The estimator
        is better when it is closer to the true parameter value. We consider the mean
        square error defined by
        MSE = E
        h
        (ξ(χ) − ξ
        ∗
        )
        2
        i
        (5)
        as criterion. Note that, when continuous data x is generated by p(x), x ∼ p(x),
        expectation E[x] and variance V ar[x] of x are defined by
        E[X] = Z
        χ
        xp(x)dx,
        V ar[X] = Z
        χ
        (x − E[X])2
        p(x)dx.
        (6)
        MSE can be decomposed as
        MSE = V ar[γ(χ)] + 
        E[γ(χ)] − ξ
        ∗
        2
        (7)
        where the first term is the variance of the estimator, and the second term is
        square of bias between the expectation of estimator and true parameter value.
        They are all positive values. It is better to make MSE smaller. There are two
        ways to make MSE smaller. One is to restrict estimator to unbiased estimator
        which has zero bias, i.e., E[ξ(χ)] − ξ
        ∗ = 0. The second is to reduce the variance
        of the estimator while permitting bias a bit.
        We are focusing on the former method. If we restrict the unbiased estimator,
        the second term of equation (7) becomes 0, therefore MSE becomes variance
        of estimator exactly. In this sense, the estimator with the smallest variance
        becomes the best estimator if we restrict the unbiased estimator. Furthermore,
        the estimator is represented by just ξ hereafter for brevity`,
      },
      {
        role: 'user',
        content: 'Use the generate_quiz function to create a perfect quiz just like what you are known for, and make sure to follow the descriptions'
      }
    ],
    function_call: { name: "generate_quiz" },
    functions: [
      {
        name: "generate_quiz",
        description:
          "Generate a comprehensive quiz from the input material, longer quizzes (10+ questions) are preferred.",
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
              description: "An array consisting a maximum of 15 questions",
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
    if (question.expected_duration <= 4) {
      question.expected_duration *= 10;
    }
    if (question.expected_duration > 4 && question.expected_duration < 12) {
      question.expected_duration *= 3;
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
