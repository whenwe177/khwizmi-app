import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
  useContext,
} from "react";

interface AppContextState {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const AppContext = createContext<AppContextState>({} as AppContextState);

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [content, setContent] = useState("");
  return (
    <AppContext.Provider value={{ content, setContent }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
