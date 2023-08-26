import {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { auth } from "@/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
interface AppContextState {
  user: User | null;
}

const AppContext = createContext<AppContextState>({} as AppContextState);

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
