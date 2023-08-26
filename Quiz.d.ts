type Choices = "a" | "b" | "c" | "d";

interface Answer {
  correct_choice: Choices;
  reason: string;
}

interface QuizQuestion {
  expected_duration: number;
  question: string;
  choices: Record<Choices, string>;
  answer: Answer
}

interface StudySession {
  ongoing: boolean;
  pages: number[];
  pdf_url: string;
  quiz?: QuizQuestion[];
  quiz_end_time?: number;
  study_end_time: number;
  uid: string;
}

interface UserAttrs {
  uid: string;
  experience: number;
}
