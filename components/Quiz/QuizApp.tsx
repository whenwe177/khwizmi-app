import React, { useEffect, useRef, useState } from "react";
import QuizQuestion from "./QuizQuestion";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import { Choices, StudySession } from "@/Quiz";
import { useRouter } from "next/router";
import { calculateScore } from "@/utils/calculateScore";
import Logo from "../Logo";
import { motion, AnimatePresence } from "framer-motion";
import Arrow from "../Svg/Arrow";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

interface Props {
  quiz: StudySession;
  quizId: string;
  contentLength: number;
}

interface CountdownProps {
  timestamp: Timestamp;
  duration: number;
  quizId: string;
  contentLength: number;
  answerPercentage: number;
}

const wrapperVariants = {
  beforeShown: {
    x: -20,
    opacity: 0,
    transition: {
      type: "tween",
    },
  },
  shown: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
  afterShown: {
    x: 20,
    opacity: 0,
    transition: {
      type: "tween",
    },
  },
};

const Countdown: React.FC<CountdownProps> = ({
  timestamp,
  duration,
  quizId,
  contentLength,
  answerPercentage,
}) => {
  const router = useRouter();
  const { user } = useAppContext();
  const [delta, setDelta] = useState(
    Math.floor((timestamp.toMillis() - Date.now()) / 1000)
  );
  const intervalRef = useRef<NodeJS.Timeout | null>();
  const decrementTimer = () => setDelta((prev) => prev - 1);

  useEffect(() => {
    intervalRef.current = setInterval(decrementTimer, 1000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  useEffect(() => {
    if (delta > 0) return;
    const studySessionRef = doc(firestore, "study_session", quizId);

    const invalidateQuiz = async () => {
      const score = calculateScore(duration, contentLength, answerPercentage);
      await updateDoc(studySessionRef, {
        ongoing: false,
        score,
      });
      const userRef = doc(firestore, "user_attributes", user!.uid);
      const userInfo = await getDoc(userRef);

      await updateDoc(userRef, {
        experience: userInfo.data()?.experience + score,
      });
      router.push(`/results/${quizId}`);
    };

    invalidateQuiz();
  }, [delta]);
  return (
    <p className="text-white text-xl font-semibold">
      {`${Math.floor(delta / 60)}`.padStart(2, "0")}:
      {`${delta % 60}`.padStart(2, "0")}
    </p>
  );
};

const Quiz: React.FC<Props> = ({ quiz, quizId, contentLength }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(Choices | null)[]>(
    (quiz.answers as (Choices | null)[]) ?? quiz.quiz?.map(() => null)!
  );
  const router = useRouter();
  const { user } = useAppContext();

  const invalidateQuiz = async () => {
    const score = calculateScore(
      quiz.duration!,
      contentLength,
      answerPercentage
    );
    await updateDoc(studySessionRef, {
      ongoing: false,
      score,
    });
    const userRef = doc(firestore, "user_attributes", user!.uid);
    const userInfo = await getDoc(userRef);

    await updateDoc(userRef, {
      experience: userInfo.data()?.experience + score,
    });
    router.push(`/results/${quizId}`);
  };

  const answerPercentage =
    userAnswers.reduce((prev, current, idx) => {
      const correctAnswer = quiz.quiz?.[idx].answer.correct_choice;
      if (current === correctAnswer) return prev + 1;
      return prev;
    }, 0) / userAnswers.length;

  const studySessionRef = doc(firestore, "study_session", quizId);
  const onUserAnswerChange = async (idx: number, choice: Choices) => {
    //@ts-ignore
    const results = [...userAnswers];
    results[idx] = choice;
    setUserAnswers(results);
    await updateDoc(studySessionRef, {
      answers: results,
    });
  };

  return (
    <>
      <div className="flex flex-col items-center w-full gap-6">
        <div className="flex my-12 items-center gap-3">
          <Logo className="h-[80px] w-[70px]" />
          <p className="text-white text-4xl font-semibold">Khwizmi</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-white font-semibold text-xl">
            {currentQuestion + 1}/{userAnswers.length}
          </h1>
          <h1 className="text-white font-semibold text-3xl my-3">
            Review Quiz
          </h1>
          <Countdown
            timestamp={quiz.quiz_end_time!}
            duration={quiz.duration!}
            quizId={quizId}
            contentLength={contentLength}
            answerPercentage={answerPercentage}
          />
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentQuestion}
            variants={wrapperVariants}
            initial="beforeShown"
            animate="shown"
            exit="afterShown"
            className="w-full"
          >
            <QuizQuestion
              question={quiz.quiz?.[currentQuestion]!}
              idx={currentQuestion}
              onUserAnswerChange={onUserAnswerChange}
              chosenAnswer={userAnswers[currentQuestion]!}
            />
          </motion.div>
        </AnimatePresence>

        <div className="flex">
          {currentQuestion > 0 && (
            <motion.button
              whileHover={{ translateX: -10 }}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
            >
              <Arrow fill="white" className="w-[25px] h-[25px]" />
            </motion.button>
          )}
          {currentQuestion < userAnswers.length - 1 && (
            <motion.button
              style={{ rotate: "180deg" }}
              whileHover={{ translateX: 10 }}
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
            >
              <Arrow fill="white" className="w-[25px] h-[25px]" />
            </motion.button>
          )}
        </div>

        <Dialog>
          <DialogTrigger>
            <Button className="bg-yellow1 text-black text-lg rounded-lg px-10 py-2 font-bold">
              Finish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>You still have time!</DialogTitle>
              <DialogDescription>
                Your attempt will be submited immideately. You've got time to
                continue answering the questions. Are you sure about this?
              </DialogDescription>
              <DialogFooter>
                <DialogClose>
                  <Button variant={"ghost"}>Nevermind</Button>
                </DialogClose>
                <Button
                  onClick={invalidateQuiz}
                  className="bg-yellow1 hover:bg-yellow-600 text-black"
                >
                  Yep, I'm done!
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Quiz;
