import React from 'react';
import ErrorDisplay from '../components/Error';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/router';
import Logo from "@/components/Logo";
import { signInWithPopup } from "firebase/auth";
import { auth, firestore, googleProvider } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";


interface ErrorProps {
  statusCode: number;
}

const ErrorPage: React.FC<ErrorProps> = ({ statusCode }) => {
  
  
  return (
  <main>
  <ErrorDisplay statusCode={statusCode} message="It seems like you're lost..." />
  </main>
  
  );
};

export default ErrorPage;