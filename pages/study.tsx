import { useAppContext } from "@/context/AppContext";
import { firestore, storage } from "@/firebase";
import { useQuery } from "@tanstack/react-query";
import { getBlob, ref } from "firebase/storage";
import { Timestamp, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { motion } from "framer-motion";
import Star from "@/components/Star";
import clsx from "clsx";
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

const useTimer = ({ onTimerEnd }: { onTimerEnd: () => void }) => {
  const timerEnd = useRef(onTimerEnd);
  const countdownInterval = useRef<NodeJS.Timeout>();
  const time = useRef(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    timerEnd.current = onTimerEnd;
  }, [onTimerEnd]);

  useEffect(() => {
    return () => clearInterval(countdownInterval.current);
  }, []);

  const startTimer = (durationInSeconds: number) => {
    clearInterval(countdownInterval.current);
    time.current = durationInSeconds;
    setSeconds(durationInSeconds);
    countdownInterval.current = setInterval(() => {
      if (time.current <= 0) {
        console.log("timer end");
        timerEnd.current();
        clearInterval(countdownInterval.current);
        return;
      }
      time.current -= 1;
      setSeconds(time.current);
    }, 1000);
  };

  return { startTimer, seconds };
};

const Study = () => {
  const { user } = useAppContext();
  const router = useRouter();
  const { startTimer, seconds } = useTimer({
    onTimerEnd: () => router.push("/quiz"),
  });
  const studySessionsRef = collection(firestore, "study_session");
  const ongoingStudySession = query(
    studySessionsRef,
    where("uid", "==", user!.uid),
    where("ongoing", "==", true)
  );

  const studySession = useQuery(["study"], {
    queryFn: async () => {
      const studySessionSnapshot = await getDocs(ongoingStudySession);
      if (!studySessionSnapshot.size) {
        router.push("/");
        return Promise.reject();
      }
      const studySession = studySessionSnapshot.docs[0].data();
      if (
        new Date(studySession.study_end_time.seconds * 1000).getTime() <
        Date.now()
      ) {
        router.push("/quiz");
        return Promise.reject();
      }
      return studySessionSnapshot.docs[0];
    },
    staleTime: Infinity,
  });

  const fileData = useQuery(["file_data"], {
    queryFn: async () => {
      const fileRef = ref(storage, studySession.data!.data().pdf_url);
      return await getBlob(fileRef);
    },
    enabled: studySession.isSuccess,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (studySession.isSuccess) {
      const seconds = Math.floor(
        studySession.data.data().study_end_time.seconds - Date.now() / 1000
      );
      startTimer(seconds);
    }
  }, [studySession.isSuccess]);

  async function endSession() {
    if (!studySession.data) return
    await updateDoc(doc(firestore, "study_session", studySession.data.id), {
      study_end_time: Timestamp.fromDate(new Date())
    })
    router.push('/quiz')
  }

  if (studySession.isLoading || fileData.isLoading) {
    return (
      <main
        style={{
          background: "linear-gradient(180deg, #0E032F 0%, #283472 100%)",
        }}
        className="min-h-screen w-full overflow-auto flex flex-col items-center justify-center"
      >
        <div
          className="w-full h-screen fixed top-0 pointer-events-none"
          style={{
            background: 'url("bg1.png")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPositionY: "150px",
          }}
        />
        <motion.div
          style={{
            opacity: 0.8,
            position: "absolute",
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
          }}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{
            rotate: {
              ease: "anticipate",
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
        >
          <Star className="h-[120px] w-[120px]" />
        </motion.div>
      </main>
    );
  }

  return (
    <main
      style={{
        background: "linear-gradient(180deg, #0E032F 0%, #283472 100%)",
      }}
      className="min-h-screen w-full overflow-auto flex flex-col items-center lg:items-end justify-center"
    >
      <div
        className="w-full h-screen fixed top-0 pointer-events-none"
        style={{
          background: 'url("bg1.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "150px",
        }}
      />
      <Document
        className={"flex flex-col items-center gap-4 p-4"}
        loading={null}
        file={fileData.data}
      >
        {studySession.data!.data().pages.map((i: number) => (
          <Page scale={2} loading={null} pageNumber={i} key={i} />
        ))}
      </Document>
      <div className="fixed top-8 left-24 flex items-center gap-4">
        <div className="h-[80px] w-[250px] rounded-lg bg-yellow1 text-black flex items-center justify-center">
          <span
            className={clsx(
              "text-4xl font-bold",
              seconds < 60 && "text-red-500"
            )}
          >
            {`${Math.floor(seconds / 60)}`.padStart(2, "0")}:
            {`${seconds - Math.floor(seconds / 60) * 60}`.padStart(2, "0")}
          </span>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button variant={"destructive"}>End Session</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>You still have time!</DialogTitle>
              <DialogDescription>
                You will be take to the A.I curated review quiz directly. You
                still have time to study! Are you sure about this?
              </DialogDescription>
              <DialogFooter>
                <DialogClose>
                  <Button variant={"ghost"}>Nevermind</Button>
                </DialogClose>
                <Button onClick={endSession} className="bg-yellow1 hover:bg-yellow-600 text-black">
                  I'm ready!
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};
Study.auth = true;
export default Study;
