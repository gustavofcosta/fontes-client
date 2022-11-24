import { createContext, ReactNode, useContext, useState } from "react";
import axios from "../services/axios";

interface ChildrenProps {
  children: ReactNode;
}

interface InitialContextInterface {
  handleRegister: () => Promise<void>;
  loading: boolean;
  setUsername: any;
  setPassword: any;
}

export const AppContext = createContext<InitialContextInterface>(
  {} as InitialContextInterface
);

export const AppProvider = ({ children }: ChildrenProps) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addTokenToLocalStorage = () => {
    localStorage.setItem("token", token);
  };

  const removeTokenToLocalStorage = () => {
    localStorage.removeItem("token");
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      let { data } = await axios.post("/login", { username, password });
      setToken(data.access_token);
      setLoading(false);
      addTokenToLocalStorage();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{ handleRegister, loading, setUsername, setPassword }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
