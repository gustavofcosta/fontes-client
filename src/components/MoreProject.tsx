import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGlobalContext } from "../context/app.Context";
import axios from "../services/axios";
import Loading from "./Loading";

interface IFormInput {
  title: string;
  zip_code: number;
  cost: number;
  done: boolean;
  deadline: any;
}

const MoreProject = () => {
  const {
    closeModalNewProject,
    modalNewProject,
    getAllProjects,
    setModalNewProject,
  } = useGlobalContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    // Preciso aprender a formatar data para conseguir enviar para o banco de dados
    console.log(data.title, data.zip_code, data.cost, data.done);
    try {
      await axios.post("/project", {
        title: data.title,
        zip_code: Number(data.zip_code),
        cost: Number(data.cost),
        done: false,
        //deadline: data.deadline,
      });
      getAllProjects();
      setModalNewProject(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`absolute right-10 md:right-72 bg-gray-200 mt-2 md:w-96 w-80 p-8 rounded-md z-10 ${
        !modalNewProject ? "hidden" : ""
      }`}
    >
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          type="text"
          placeholder="Titulo"
          {...register("title", {
            required: true,
          })}
        />
        {errors?.title?.type === "required" && (
          <p className="error">Este campo é obrigatório</p>
        )}
        <input
          type="number"
          placeholder="Código postal"
          className="input"
          {...register("zip_code", {
            required: true,
          })}
        />
        {errors?.zip_code?.type === "required" && (
          <p className="error">Este campo é obrigatório</p>
        )}
        <input
          className="input"
          {...register("cost")}
          type="number"
          placeholder="Custo"
        />
        {/*<label>
          Data para finalizar{" "}
          <input
            className="input"
            {...register("deadline")}
            type="date"
            placeholder="data"
          />
    </label>*/}

        <input
          type="submit"
          value="Criar"
          className="flex-1 text-base rounded-md bg-primary_500 text-white p-1 cursor-pointer transition-all duration-500 ease-in-out hover:bg-primary_100"
        />
      </form>
      <button
        type="button"
        onClick={closeModalNewProject}
        className="flex-1 mt-4 text-secondary_600 hover:text-secondary_400 transition-all duration-500 ease-in-out"
      >
        Fechar
      </button>
    </div>
  );
};

export default MoreProject;
