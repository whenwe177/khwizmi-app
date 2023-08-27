import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import PdfUploader from "@/components/PdfUpload";
import ChoosePage from "@/components/ChoosePage";
import { firestore, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

async function uploadFile(file: File) {
  const storageRef = ref(storage, nanoid());
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

export default function Upload() {
  const { user } = useAppContext();
  const [showShortcut, setShowShortcut] = useState(false);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [studyDuration, setStudyDuration] = useState<number>(0);
  const router = useRouter();
  const startStudying = useMutation({
    onSuccess: () => {
      router.push("/study");
    },
    mutationFn: async () => {
      if (!fileUpload || !studyDuration || !user) return;
      const pdfUrl = await uploadFile(fileUpload);
      const studySessionEnd = new Date(
        new Date().getTime() + studyDuration * 60000
      );
      await addDoc(collection(firestore, "study_session"), {
        ongoing: true,
        pages: Array.from(selectedPages).sort((a, b) => a - b),
        pdf_url: pdfUrl,
        uid: user.uid,
        study_end_time: Timestamp.fromDate(studySessionEnd),
      });
    },
  });

  useEffect(() => {
    const scrollListener = (e: Event) => {
      setShowShortcut(window.scrollY > 50);
    };
    addEventListener("scroll", scrollListener);
    return () => removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <main
      style={{
        background: "linear-gradient(180deg, #0E032F 0%, #283472 100%)",
      }}
      className="min-h-screen w-full overflow-auto flex flex-col items-center justify-center"
    >
      {showShortcut && (
        <Button
          onClick={() => window.scrollTo(0, 0)}
          className="rounded-full w-[60px] h-[60px] fixed bottom-10 right-10 bg-yellow1 hover:bg-yellow-600 text-black font-semibold text-2xl"
        >
          ↑
        </Button>
      )}

      <div
        className="w-full h-screen fixed top-0 pointer-events-none"
        style={{
          background: 'url("bg1.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "150px",
        }}
      />
      <PdfUploader fileUpload={fileUpload} setFileUpload={setFileUpload}>
        <div className="flex mt-4 gap-4 items-center">
          <label className="text-white font-bold w-56" htmlFor="minutes">
            <span className="font-normal">Study duration: </span>
            {studyDuration || "0"} minute(s)
          </label>
          <Slider
            className="w-[300px]"
            onValueChange={(value) => setStudyDuration(value[0])}
            defaultValue={[0]}
            max={60}
            step={1}
          />
          <Button
            size={"lg"}
            onClick={() => startStudying.mutate()}
            disabled={
              !(selectedPages.size && studyDuration) || startStudying.isLoading
            }
            className={clsx("font-semibold rounded-md text-white z-10", {
              "bg-slate-300":
                !(selectedPages.size && studyDuration) ||
                startStudying.isLoading,
              "bg-green-500 hover:bg-green-800":
                selectedPages.size && studyDuration,
            })}
          >
            Start Studying!
          </Button>
        </div>
      </PdfUploader>

      {fileUpload && (
        <>
          <h2 className="text-white font-bold underline text-2xl">
            Choose up to 5 pages!
          </h2>
          <ChoosePage
            selectedPages={selectedPages}
            setSelectedPages={setSelectedPages}
            file={fileUpload}
          />
        </>
      )}
    </main>
  );
}
