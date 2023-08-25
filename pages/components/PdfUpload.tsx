import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

import {pdfjs} from "react-pdf";

// import pdfJsLib from "pdfjs-dist";

const PdfUploader = () => {
  pdfjs.GlobalWorkerOptions.workerSrc =
	`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.js`;
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (fileUpload == null) return;
    const fileFolderPath = `projectFiles/${fileUpload.name}`;
    const fileFolderRef = ref(storage, fileFolderPath);

    try {
      await uploadBytes(fileFolderRef, fileUpload);
      const url = await getDownloadURL(ref(storage, fileFolderPath));
      setFileUrl(url);
    } catch (error) {
      console.error(error);
    }
  };

  const parsePDF = async () => {
    
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          type="file"
          onChange={(e) => setFileUpload(e.target.files?.[0] ?? null)}
        />
        <button>Upload</button>
      </form>
      <button onClick={() => parsePDF()}>Test</button>
    </div>
  );
};

export default PdfUploader;
