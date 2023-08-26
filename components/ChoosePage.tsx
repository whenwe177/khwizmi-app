import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import clsx from "clsx";
import { motion } from "framer-motion";

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
    <motion.div
      className={clsx(
        "fixed bottom-12 flex bg-slate-400 box-border p-4 rounded-md gap-4"
      )}
      initial={{ y: 15 }}
      animate={{ y: 0 }}
    >
      {pages.map((i, pageIndex) => (
        <div key={i} className="relative">
          <Page
            renderAnnotationLayer={false}
            renderTextLayer={false}
            scale={0.15}
            pageNumber={i}
          />
          <div className="flex items-center justify-center absolute w-full h-full bg-black pointer-events-none top-0 opacity-50">
            <span className="text-2xl text-white font-bold">
              {pageIndex + 1}
            </span>
          </div>
          <div
            onClick={() => onDelete(i)}
            className="w-6 h-6 absolute rounded-full -top-2 -right-2 !cursor-pointer bg-black text-white flex items-center justify-center"
          >
            <span className="text-lg">×</span>
          </div>
        </div>
      ))}
    </motion.div>
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
        {Array.from(new Array(totalPages), (_, i) => i + 1).map((i) => {
          const sorted = Array.from(selectedPages).sort((a, b) => a - b);
          return (
            <div key={i} className="relative">
              <Page
                onClick={() => onPageSelect(i)}
                scale={0.8}
                className={clsx("cursor-pointer")}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                pageNumber={i}
              />
              {selectedPages.has(i) && (
                <div className="flex items-center justify-center absolute w-full h-full bg-black pointer-events-none top-0 opacity-50">
                  <span className="text-8xl text-white font-bold">
                    {sorted.findIndex((x) => x === i) + 1}
                  </span>
                </div>
              )}
            </div>
          );
        })}
        <PagesPreview
          onDelete={(pageNum) => onPageSelect(pageNum)}
          selectedPages={selectedPages}
        />
      </Document>
    </div>
  );
};

export default ChoosePage;
