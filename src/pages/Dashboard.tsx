import { FilePlus } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MoreProject from "../components/MoreProject";
import { useGlobalContext } from "../context/app.Context";
import Projects from "../components/Projects";
import EditeProject from "../components/EditProject";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, openModalNewProject } = useGlobalContext();

  if (!user) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <main className="w-screen min-h-screen bg-slate-100">
      <div className="w-full p-4 px-8">
        <Navbar />
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center  mt-10">
            <h2 className="text-xl font-semibold">Projetos</h2>
            <button
              onClick={openModalNewProject}
              type="button"
              className="flex justify-center items-center gap-1 bg-primary_500 px-4 py-1 text-base rounded-md text-white hover:bg-primary_400 transition-all duration-500 ease-in-out"
            >
              <FilePlus className="text-lg font-bold" />
              Novo
            </button>
          </div>
          <MoreProject />
          <EditeProject />
          <Projects />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
