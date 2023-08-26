import {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { auth, firestore } from "@/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
interface AppContextState {
  user: User | null;
}

const AppContext = createContext<AppContextState>({} as AppContextState);

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user && ['/', '/quiz', '/study'].includes(router.asPath)) {
        const studySessionsRef = collection(firestore, 'study_session')
        const ongoingStudySession = query(studySessionsRef, where('uid', "==", user.uid), where('ongoing', "==", true), limit(1));
        const studySessionSnapshot = await getDocs(ongoingStudySession);
        if (studySessionSnapshot.size) {
          studySessionSnapshot.docs.forEach(doc => {
            const data = doc.data() as any;
            if (new Date(data.study_end_time.seconds*1000).getTime() < Date.now()) {
              return router.push('/quiz');
            }
            return router.push('/study');
          })
        }
      }
      setLoading(false);
    });
  }, []);

  return <AppContext.Provider value={{ user }}>{!loading && children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
