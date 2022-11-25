import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "../services/axios";

interface ChildrenProps {
  children: ReactNode;
}

interface InitialContextInterface {
  registerUser: (
    name: string,
    username: string,
    password: string
  ) => Promise<void>;
  loggerUser: (username: string, password: string) => Promise<void>;
  loading: boolean;

  successes: boolean;
  error: boolean;
  errorLogin: boolean;
  user: boolean;
  logoutUser: () => void;
}

export const AppContext = createContext<InitialContextInterface>(
  {} as InitialContextInterface
);

export const AppProvider = ({ children }: ChildrenProps) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [successes, setSuccesses] = useState(false);
  const [error, setError] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [user, setUser] = useState(false);

  const addTokenToLocalStorage = () => {
    localStorage.setItem("token", token);
  };

  const removeTokenToLocalStorage = () => {
    localStorage.removeItem("token");
  };

  const registerUser = async (
    name: string,
    username: string,
    password: string
  ) => {
    setLoading(true);
    try {
      await axios.post("/user", { name, username, password });

      setSuccesses(true);
      setUser(true);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(true);
    }
  };

  const loggerUser = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/login", { username, password });

      console.log(data.username, data.password);

      if (username !== data.username || password !== data.password) {
        setErrorLogin(true);
      }

      setSuccesses(true);
      setUser(true);
      setLoading(false);
    } catch (error: any) {
      setErrorLogin(true);
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setUser(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  useEffect(() => {
    setTimeout(() => {
      setErrorLogin(false);
    }, 3000);
  }, [errorLogin]);

  useEffect(() => {
    setTimeout(() => {
      setSuccesses(false);
    }, 3000);
  }, [successes]);

  return (
    <AppContext.Provider
      value={{
        registerUser,
        loggerUser,
        loading,
        successes,
        error,
        user,
        errorLogin,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
