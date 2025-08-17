// context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import supabase from "../supabase/config"; // ✅ your Supabase client

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);        // Supabase Auth user
  const [userData, setUserData] = useState(null); // Supabase profile table row
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ track login status

  useEffect(() => {
    // 1️⃣ Check current session on mount
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
        setIsLoggedIn(true);
        fetchUserData(data.session.user.id);
      } else {
        setUser(null);
        setUserData(null);
        setIsLoggedIn(false);
        setLoading(false);
      }
    };
    init();

    // 2️⃣ Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          setIsLoggedIn(true);
          fetchUserData(session.user.id);
        } else {
          setUser(null);
          setUserData(null);
          setIsLoggedIn(false);
          setLoading(false);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const fetchUserData = async (userId) => {
    const { data, error } = await supabase
      .from("users") // your Supabase table
      .select("*")
      .eq("id", userId) // assuming id matches auth user id
      .single();

    if (error) {
      console.log("⚠️ No Supabase profile for UID:", userId, error);
      setUserData(null);
    } else {
      setUserData(data);
    }
    setLoading(false);
  };

  // 3️⃣ Logout helper
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserData(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userData,
        loading,
        isLoggedIn, // ✅ exposed login state
        signOut, // ✅ exposed logout function
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook
export const useUser = () => useContext(UserContext);
