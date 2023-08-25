import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

const PdfUploader = () => {
    const [fileUpload, setFileUpload] = useState<File | null>(null);
    const fileReader = useRef<FileReader>();
    useEffect(() => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.js`;
        fileReader.current = new FileReader();
    }, [])

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    
    if (fileUpload == null) {
        console.log("Upload smth");
        return;
    }
    console.log("First")
    const buffer = await fileUpload?.arrayBuffer();
    console.log("Works")
    const loadingTask = pdfjsLib.getDocument(buffer!);
    
    const pdf = await loadingTask.promise
    const page = await pdf.getPage(2);
    const result = await page.getTextContent();
    const resultString = result.items.map((item: any) => item.str).join(" ")
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
