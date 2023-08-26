import { Timestamp } from "firebase/firestore";

type Choices = "a" | "b" | "c" | "d";

interface Answer {
  correct_choice: Choices;
  reason: string;
}

interface Question {
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
  answers?: Choices | null [];
  quiz_end_time?: Timestamp;
  study_end_time: Timestamp;
  uid: string;
}

interface UserAttrs {
  uid: string;
  experience: number;
}
