import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { useDropzone } from "react-dropzone";
import { Inter } from "next/font/google";
import Upload from "./Svg/Upload";
import { toast } from "react-toastify";
import File from "./Svg/File";
import { parsePdf } from "@/utils/pdf";

interface Props extends React.PropsWithChildren {
  fileUpload: File | null;
  setFileUpload: Dispatch<SetStateAction<File | null>>
}

const inter = Inter({ subsets: ["latin"] });

const PdfUploader: React.FC<Props> = ({ children, fileUpload, setFileUpload }) => {

  const onDrop = useCallback((files: File[]) => {
    const uploadedFile = files[0];
    setFileUpload(uploadedFile);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!fileUpload) {
      toast.error("Please upload a PDF file.");
      return;
    }
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className={`${inter.className} flex flex-col items-center p-8 gap-4`}
    >
      <h1 className="font-bold text-lg text-purple1">
        Upload Your Study Material
      </h1>
      <div
        {...getRootProps({
          className:
            "gap-3 flex flex-col items-center w-full p-8 rounded-md border-blue1 border-2 bg-blue1/10",
        })}
        onClick={(e) => e.stopPropagation()}
      >
        {fileUpload == null ? (
          <>
            <input {...getInputProps()} />
            <Upload color="#6D6F62" width={40} height={40} />
            <p className="text-sm text-gray-500">Drag & drop files here</p>
            <button
              className="bg-blue1 text-sm font-semibold rounded-md py-2 px-8 text-white"
              type="button"
              onClick={open}
            >
              Browse
            </button>
            <p className="text-gray-500 font-semibold text-base">PDF only</p>
          </>
        ) : (
          <>
            <File color="#6D6F62" height={40} />
            <p className="text-sm text-gray-500">{fileUpload.name}</p>
            <button
              className="bg-blue1 text-sm font-semibold rounded-md py-2 px-8 text-white"
              type="button"
              onClick={open}
            >
              Resubmit
            </button>
          </>
        )}
      </div>
      {children}
    </form>
  );
};

export default PdfUploader;
