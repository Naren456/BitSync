// context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import supabase from "../supabase/config";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.log("⚠️ No Supabase profile for UID:", userId, error);
      setUserData(null);
    } else {
      setUserData(data);
    }
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserData(null);
    setIsLoggedIn(false);
  };

  // ✅ Sign up helper
  const signUp = async (email, password, name, semester, term, cohort) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      const userId = data.user?.id;
      if (!userId) throw new Error("User ID not returned after sign-up");

      const { error: insertError } = await supabase.from("users").insert([
        {
          id: userId,
          name,
          email,
          semester,
          term,
          cohort,
        },
      ]);

      if (insertError) throw insertError;

      return { success: true };
    } catch (err) {
      console.log("Sign up error:", err.message);
      return { success: false, error: err.message };
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userData,
        loading,
        isLoggedIn,
        signOut,
        signUp, 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
