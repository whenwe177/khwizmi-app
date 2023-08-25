import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

//@ts-ignore
import { pdfjs } from "react-pdf";
import { AppProvider } from "@/context/AppContext";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.js`;
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.js`;
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </QueryClientProvider>
  );
}
