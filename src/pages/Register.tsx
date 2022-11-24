import { AppleLogo, GoogleLogo } from "phosphor-react";
import { useState } from "react";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context/app.Context";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  username: string;
  password: string;
}

function Register() {
  const { loading, setPassword, setUsername } = useGlobalContext();

  const [create, setCreate] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setUsername(data.username);
    setPassword(data.password);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen w-screen md:mb-20">
      <div className="bg-white max-w-md mx-auto mt-4 shadow-sm shadow-gray-200 rounded-md h-screen flex justify-center">
        <div className="p-4 pt-6 md:p-10 flex flex-col justify-center items-center">
          <h1 className="font-bold text-4xl text-primary_500">Fontes</h1>
          <p className="text-sm md:text-base mt-4 tracking-wider">
            Aqui começa seu futuro
          </p>
          <button className="w-[290px] flex text-xs md:text-sm tracking-wider justify-center items-center gap-2 border-2 border-gray-200 text-gray-600 rounded-md px-10 py-2 mt-10 hover:bg-gray-100 transition-all duration-500 ease-in-out ">
            <GoogleLogo className="text-lg" />
            Continuar com Google
          </button>
          <button className="w-[290px] flex text-xs md:text-sm tracking-wider justify-center items-center gap-2 border-2 border-gray-200 text-gray-600 rounded-md px-10 py-2 mt-2 hover:bg-gray-100 transition-all duration-500 ease-in-out">
            <AppleLogo className="text-lg" />
            Continuar com Apple{" "}
          </button>

          <div className="py-2 pb-2">ou</div>

          <form
            className="w-[290px] space-y-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="w-full border border-gray-200 rounded-md px-2 py-2 text-center"
              placeholder="username"
              {...register("username", {
                required: true,
                minLength: 5,
                maxLength: 20,
              })}
            />
            {errors?.username?.type === "required" && (
              <p className="error">Este campo é obrigatório</p>
            )}
            {errors.username?.type === "maxLength" && (
              <p className="error">
                username não pode ser maior que 20 caracteres
              </p>
            )}
            {errors.username?.type === "minLength" && (
              <p className="error">
                username não pode ser menor que 5 caracteres
              </p>
            )}
            <input
              className="w-full border border-gray-200 rounded-md px-2 py-2 text-center"
              placeholder="senha"
              {...register("password", {
                required: true,
                minLength: 5,
                maxLength: 20,
                pattern:
                  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
              })}
            />
            {errors?.password?.type === "required" && (
              <p className="error">Este campo é obrigatório</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="error">senha não pode ser menor que 5 caracteres</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="error">
                senha não pode ser maior que 20 caracteres
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="error">
                senha deve conter letras minusculas, minusculas e números
              </p>
            )}
            {!create ? (
              <button
                type="submit"
                className="w-[290px] flex text-xs md:text-sm tracking-wider justify-center items-center bg-primary_500 rounded-md px-10 py-2 mt-2 hover:bg-primary_400 transition-all duration-500 ease-in-out text-white"
              >
                Entrar
              </button>
            ) : (
              <button
                type="submit"
                className="w-[290px] flex text-xs md:text-sm tracking-wider justify-center items-center bg-primary_500 rounded-md px-10 py-2 mt-2 hover:bg-primary_400 transition-all duration-500 ease-in-out text-white"
              >
                Criar
              </button>
            )}
          </form>

          <p className="text-xs md:text-base my-6">Não possui uma conta?</p>
          {!create ? (
            <button
              className="text-xs md:text-base text-primary_500 hover:text-primary_400 transition-all duration-500 ease-in-out"
              onClick={() => setCreate(!create)}
            >
              Criar conta
            </button>
          ) : (
            <button
              className="text-xs md:text-base text-primary_500 hover:text-primary_400 transition-all duration-500 ease-in-out"
              onClick={() => setCreate(!create)}
            >
              Já possui uma conta
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
