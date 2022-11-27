import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProjectProps } from "../components/Projects";
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
  modalNewProject: boolean;
  modalEditProject: boolean;
  openModalNewProject: any;
  closeModalNewProject: () => void;
  openModalEditProject: (id: string) => void;
  closeModalEditProject: () => void;
  getAllProjects: () => void;
  allProjects: ProjectProps[];
  idProject: string;
  setModalNewProject: any;
  setModalEditProject: any;
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
  const [user, setUser] = useState(true);
  const [modalNewProject, setModalNewProject] = useState(false);
  const [modalEditProject, setModalEditProject] = useState(false);
  const [allProjects, setAllProjects] = useState<ProjectProps[]>([]);
  const [idProject, setIdProject] = useState("");

  const openModalNewProject = () => {
    setModalNewProject(true);
  };

  const closeModalNewProject = () => {
    setModalNewProject(false);
  };

  const openModalEditProject = (id: string) => {
    setModalEditProject(true);
    setIdProject(id);
    console.log(id);
  };

  const closeModalEditProject = () => {
    setModalEditProject(false);
  };

  //Preciso aprender a fazer a requisição do token para armazenar no locaistorage
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
      await axios.post("/login", {
        username,
        password,
      });

      {
        /* if (username !== data.username || password !== data.password) {
        setErrorLogin(true);
      }
      */
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

  const getAllProjects = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/project");
      setAllProjects(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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
        modalNewProject,
        openModalNewProject,
        closeModalNewProject,
        getAllProjects,
        allProjects,
        openModalEditProject,
        closeModalEditProject,
        modalEditProject,
        idProject,
        setModalNewProject,
        setModalEditProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
