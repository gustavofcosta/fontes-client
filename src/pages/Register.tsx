import { AppleLogo, GoogleLogo } from "phosphor-react";
import { useState } from "react";

function Register() {
  const [create, setCreate] = useState(false);

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

          <form className="w-[290px] space-y-3">
            <input
              className="w-full border border-gray-200 rounded-md px-2 py-2 text-center"
              type="text"
              placeholder="username"
            />
            <input
              className="w-full border border-gray-200 rounded-md px-2 py-2 text-center"
              type="text"
              placeholder="senha"
            />
            {!create ? (
              <button
                className="w-[290px] flex text-xs md:text-sm tracking-wider justify-center items-center bg-primary_500 rounded-md px-10 py-2 mt-2 hover:bg-primary_400 transition-all duration-500 ease-in-out text-white"
                onClick={() => setCreate(!create)}
              >
                Entrar
              </button>
            ) : (
              <button
                className="w-[290px] flex text-xs md:text-sm tracking-wider justify-center items-center bg-primary_500 rounded-md px-10 py-2 mt-2 hover:bg-primary_400 transition-all duration-500 ease-in-out text-white"
                onClick={() => setCreate(!create)}
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
