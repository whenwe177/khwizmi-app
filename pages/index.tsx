import { Inter } from 'next/font/google'
import PdfUploader from "../components/PdfUpload";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
        <PdfUploader />
    </main>
      
  )
}
