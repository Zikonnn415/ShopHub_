import React, { useState, useEffect, createContext } from "react";
import supabase from "../../supaBaseClient";

// create context
export const SessionContext = createContext(null);

// provider component
export function LoginContext({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const {
      data: { subscription }, 
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);3
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}
