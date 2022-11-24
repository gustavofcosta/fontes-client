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
  handleRegister: () => Promise<void>;
  loading: boolean;
  setName: any;
  setUsername: any;
  setPassword: any;
  registerSuccesses: string;
  isLogin: boolean;
}

export const AppContext = createContext<InitialContextInterface>(
  {} as InitialContextInterface
);

export const AppProvider = ({ children }: ChildrenProps) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccesses, SetRegisterSuccesses] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const addTokenToLocalStorage = () => {
    localStorage.setItem("token", token);
  };

  const removeTokenToLocalStorage = () => {
    localStorage.removeItem("token");
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/user", { name, username, password });

      SetRegisterSuccesses("Registro Realizado com sucesso");
      setIsLogin(true);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      setLoading(true);
      await axios.post("/login", { username, password });

      SetRegisterSuccesses("Registro Realizado com sucesso");
      setIsLogin(true);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name && username && password) {
      handleRegister();
    }
  }, [username, password]);

  return (
    <AppContext.Provider
      value={{
        handleRegister,
        loading,
        setUsername,
        setPassword,
        setName,
        registerSuccesses,
        isLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
