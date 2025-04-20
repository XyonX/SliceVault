"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  //Storing the metamask id
  const [userId, setUserId] = useState("");

  // all the files user has
  const [userFiles, setUserFiles] = useState(null);

  useEffect(async () => {
    const response = await fetch("http://localhost:3001/files");
    const files = await response.json();
    setUserFiles(files);
  }, []);
  return (
    <AppContext.Provider value={{ userId, setUserId, userFiles, setUserFiles }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
