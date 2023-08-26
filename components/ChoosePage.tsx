import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import clsx from "clsx";

const PagesPreview = ({
  selectedPages,
  onDelete,
}: {
  selectedPages: Set<number>;
  onDelete: (pageNum: number) => void;
}) => {
  const pages = Array.from(selectedPages).sort((a, b) => a - b);

  if (!pages.length) {
    return null;
  }

  return (
    <div
      className={clsx(
        "fixed bottom-12 left-1/2 -translate-x-1/2 flex bg-slate-400 box-border p-4 rounded-md gap-4"
      )}
    >
      {pages.map((i) => (
        <div key={i} className="relative">
          <Page
            renderAnnotationLayer={false}
            renderTextLayer={false}
            scale={0.15}
            pageNumber={i}
          />
          <div
            onClick={() => onDelete(i)}
            className="w-5 h-5 absolute rounded-full top-0 right-0 !cursor-pointer"
          >
            ×
          </div>
        </div>
      ))}
    </div>
  );
};

const ChoosePage = ({
  selectedPages,
  setSelectedPages,
  file,
}: {
  selectedPages: Set<number>;
  setSelectedPages: React.Dispatch<React.SetStateAction<Set<number>>>;
  file: File;
}) => {
  const [totalPages, setTotalPages] = useState(0);

  function onPageSelect(pageNum: number) {
    const updatedSet = new Set(selectedPages);
    if (selectedPages.has(pageNum)) {
      updatedSet.delete(pageNum);
    } else {
      if (updatedSet.size === 5) return;
      updatedSet.add(pageNum);
    }
    setSelectedPages(updatedSet);
  }
  return (
    <div>
      <Document
        onLoadSuccess={(pdf) => {
          setTotalPages(pdf.numPages);
        }}
        className={
          "flex gap-2 flex-wrap justify-center items-center select-none m-4"
        }
        file={file}
      >
        {Array.from(new Array(totalPages), (_, i) => i + 1).map((i) => (
          <Page
            onClick={() => onPageSelect(i)}
            scale={0.8}
            className={clsx(
              "cursor-pointer",
              selectedPages.has(i) && "outline outline-3 outline-red-600"
            )}
            renderTextLayer={false}
            key={i}
            pageNumber={i}
          />
        ))}
        <PagesPreview
          onDelete={(pageNum) => onPageSelect(pageNum)}
          selectedPages={selectedPages}
        />
      </Document>
    </div>
  );
};

export default ChoosePage;
