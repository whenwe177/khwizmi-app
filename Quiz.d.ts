type Choices = "a" | "b" | "c" | "d";

interface Answer {
  correct_choice: Choices;
  reason: string;
}

interface QuizQuestion {
  expected_duration: number;
  question: string;
  choices: Record<Choices, string>;
  answer: Answer;
}
