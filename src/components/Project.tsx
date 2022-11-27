import { Pen, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/app.Context";
import axios from "../services/axios";
import Loading from "./Loading";
import { ProjectProps } from "./Projects";

const Project = ({
  id,
  title,
  zip_code,
  cost,
  done,
}: //deadline,
ProjectProps) => {
  const { getAllProjects, openModalEditProject } = useGlobalContext();

  const [loading, setLoading] = useState(false);

  const removeProject = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/project/${id}`);
      getAllProjects();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    removeProject;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <article className="bg-primary_200 flex-1 flex border border-gray-50 justify-between items-center p-1 px-2 mb-2 rounded-md text-xs md:text-base">
      <h1>{title}</h1>
      <p>Cep: {zip_code}</p>
      <p>R$ {cost}</p>
      {/*<p>{deadline}</p>*/}
      <p>Finalizado: {done ? "sim" : "não"}</p>
      <div className="flex gap-1 md:gap-4">
        <Pen
          onClick={() => openModalEditProject(id)}
          className="text-sm md:text-base cursor-pointer hover:text-colorGreenDark"
        />
        <Trash
          onClick={() => removeProject(id)}
          className="text-base md:text-lg cursor-pointer hover:text-colorRedDark"
        />
      </div>
    </article>
  );
};

export default Project;
