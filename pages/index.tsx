import { Inter } from 'next/font/google'
import PdfUploader from "../components/PdfUpload";
import ChoosePage from '@/components/ChoosePage';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  return (
    <main>
        <PdfUploader fileUpload={fileUpload} setFileUpload={setFileUpload}/>
        <ChoosePage selectedPages={selectedPages} setSelectedPages={setSelectedPages} file={fileUpload!}/>
    </main>
      
  )
}
