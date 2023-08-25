import { Inter } from 'next/font/google'
import PdfUploader from "../components/PdfUpload";
import ChoosePage from '@/components/ChoosePage';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());


  return (
    <main>
        <ChoosePage selectedPages={selectedPages} setSelectedPages={setSelectedPages} />
    </main>
      
  )
}
