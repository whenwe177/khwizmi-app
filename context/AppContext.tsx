import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState, useContext } from "react";

interface AppContextState {
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    quizEndTime: Date | null,
    setQuizEndTime: Dispatch<SetStateAction<Date | null>>;
}

const AppContext = createContext<AppContextState>({} as AppContextState);

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [content, setContent] = useState("");
    const [quizEndTime, setQuizEndTime] = useState<Date | null>(null);
  return (
    <AppContext.Provider value={{content, setContent, quizEndTime, setQuizEndTime }}>
        { children }
    </AppContext.Provider>
  )
}

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext }