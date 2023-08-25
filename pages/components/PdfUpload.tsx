import { useCallback, useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { useDropzone } from "react-dropzone";

const PdfUploader = () => {
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const onDrop = useCallback((files: File[]) => {
    const uploadedFile = files[0];
    setFileUpload(uploadedFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1
  });

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.js`;
  }, []);

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (fileUpload == null) {
      console.log("Upload smth");
      return;
    }
    const buffer = await fileUpload?.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument(buffer!);

    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const result = await page.getTextContent();
    const resultString = result.items.map((item: any) => item.str).join("");
    console.log(resultString);
  };

  const parsePDF = async () => {};

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div
          {...getRootProps({ className: "bg-slate-500 w-[100px] h-[100px]" })}
        >
          <input {...getInputProps()} />
          <p>Drag and drop some files here</p>
        </div>
        <button>Upload</button>
      </form>
      <button onClick={() => parsePDF()}>Test</button>
    </div>
  );
};

export default PdfUploader;
