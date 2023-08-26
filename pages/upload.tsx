import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import PdfUploader from "@/components/PdfUpload";
import ChoosePage from "@/components/ChoosePage";
import { firestore, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { nanoid }from "nanoid"

async function uploadFile(file: File) {
  const storageRef = ref(storage, nanoid());
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

export default function Home() {
  const { user } = useAppContext();
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [studyDuration, setStudyDuration] = useState<number>(0);
  const startStudying = useMutation({
    mutationFn: async () => {
      if (!fileUpload || !studyDuration || !user) return;
      const pdfUrl = await uploadFile(fileUpload);
      const studySessionEnd = new Date(new Date().getTime() + studyDuration * 60000);
      await addDoc(collection(firestore, "study_session"), {
        ongoing: true,
        pages: Array.from(selectedPages).sort((a,b) => (a - b)),
        pdf_url: pdfUrl,
        uid: user.uid,
        study_end_time: Timestamp.fromDate(studySessionEnd)
      })
    },
  });

  return (
    <main>
      <div className="absolute">{user ? `Hi, ${user.displayName}` : ""}</div>
      <PdfUploader fileUpload={fileUpload} setFileUpload={setFileUpload}>
        <div className="flex mt-4 gap-4 items-center">
          <label htmlFor="minutes">Study duration</label>
          <select onChange={(e) => setStudyDuration(parseInt(e.target.value))} id="minutes">
            {Array.from(new Array(61), (_, i) => i).map((min) => (
              <option key={min} value={min}>
                {min}
              </option>
            ))}
          </select>
          <span>minute(s)</span>
          <button
            onClick={() => startStudying.mutate()}
            disabled={!(selectedPages.size && studyDuration)}
            className={clsx("py-2 px-14 font-semibold rounded-md text-white", {
              "bg-slate-300": !(selectedPages.size && studyDuration),
              "bg-green1": (selectedPages.size && studyDuration),
            })}
          >
            Start Studying!
          </button>
        </div>
      </PdfUploader>
      <ChoosePage
        selectedPages={selectedPages}
        setSelectedPages={setSelectedPages}
        file={fileUpload!}
      />
    </main>
  );
}
