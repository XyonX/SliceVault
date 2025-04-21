"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  //Storing the metamask id
  const [userId, setUserId] = useState("");

  // all the files user has
  const [userFiles, setUserFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true); // Internet status
  const [backendReachable, setBackendReachable] = useState(true); // Server status

  //  Check internet connectivity
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus(); // initial check

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  // Load stored wallet address
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  //store user on local when id  changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  // — Fetch files when userId or connectivity changes
  useEffect(() => {
    if (!userId || !isOnline) {
      setUserFiles(null);
      return;
    }

    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3001/files");
        if (!res.ok) throw new Error("Server not responding");
        const files = await res.json();
        if (!cancelled) {
          setUserFiles(files);
          setBackendReachable(true);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        if (!cancelled) {
          setBackendReachable(false);
          setUserFiles(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [userId, isOnline]);

  const addFile = (file) => {
    setUserFiles((prev) => [file, ...prev]);
  };
  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        userFiles,
        setUserFiles,
        addFile,
        isLoading,
        setIsLoading,
        isOnline,
        backendReachable,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    return new Error("Use App Context must be within an AppProvider");
  }
  return context;
};
