import React, { createContext, useState, useEffect, useContext } from "react";

export interface UserData {
  fullName: string;
  cpf: string;
  birthDate: string;
  referenceImg: string | null;
  fatherUrl: string;
  front: string | null;
  back: string | null;
  pepApproved?: boolean;
  pepMessage?: string;
  pepFunctions?: string[];
}

interface UserDataContextProps {
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
  resetUserData: () => void;
}

const defaultUserData: UserData = {
  fullName: "",
  cpf: "",
  birthDate: "",
  referenceImg: null,
  fatherUrl: "",
  front: null,
  back: null,
  pepApproved: undefined,
  pepMessage: "",
  pepFunctions: [],
};

const UserDataContext = createContext<UserDataContextProps | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserDataState] = useState<UserData>(defaultUserData);

  useEffect(() => {
    const stored = localStorage.getItem("kyc_userData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserDataState(parsed);
      } catch (err) {
        console.error("Erro ao carregar userData do localStorage", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kyc_userData", JSON.stringify(userData));
  }, [userData]);

  const setUserData = (data: Partial<UserData>) => {
    setUserDataState((prev) => ({ ...prev, ...data }));
  };

  const resetUserData = () => {
    localStorage.removeItem("kyc_userData");
    setUserDataState(defaultUserData);
  };

  return (
    <UserDataContext.Provider value={{ userData, setUserData, resetUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData deve ser usado dentro de UserDataProvider");
  }
  return context;
};
