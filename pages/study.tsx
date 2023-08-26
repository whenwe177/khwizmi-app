import { useAppContext } from "@/context/AppContext";
import { firestore, storage } from "@/firebase";
import { useQuery } from "@tanstack/react-query";
import { getBlob, ref } from "firebase/storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

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

  const studySession = useQuery(["study"], {
    queryFn: async () => {
      const studySessionsRef = collection(firestore, "study_session");
      const ongoingStudySession = query(
        studySessionsRef,
        where("uid", "==", user!.uid),
        where("ongoing", "==", true)
      );
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
      return studySession;
    },
    staleTime: Infinity,
  });

  const fileData = useQuery(["file_data"], {
    queryFn: async () => {
      const fileRef = ref(storage, studySession.data!.pdf_url);
      return await getBlob(fileRef);
    },
    enabled: studySession.isSuccess,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (studySession.isSuccess) {
      const seconds = Math.floor(
        studySession.data.study_end_time.seconds - Date.now() / 1000
      );
      startTimer(seconds);
    }
  }, [studySession.isSuccess]);

  if (fileData.isLoading || studySession.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Document
      className={"flex flex-col items-center gap-4 bg-black p-4"}
      loading={null}
      file={fileData.data}
    >
      {studySession.data!.pages.map((i: number) => (
        <Page scale={2} loading={null} pageNumber={i} key={i} />
      ))}
    </Document>
  );
};
Study.auth = true;
export default Study;
