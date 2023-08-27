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
  score: number;
  correct_answers: number;
  ongoing: boolean;
  pages: number[];
  pdf_url: string;
  quiz?: Question[];
  answers?: Choices | null [];
  quiz_end_time?: Timestamp;
  study_end_time: Timestamp;
  uid: string;
  duration?: number;
  is_result_viewed?: boolean;
}

interface UserAttrs {
  uid: string;
  experience: number;
  photo_url: string;
  name: string;
}
