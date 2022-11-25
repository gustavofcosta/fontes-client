import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/app.Context";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useGlobalContext();

  if (!user) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <main className="w-screen min-h-screen bg-slate-100">
      <div className="w-full p-4 px-8">
        <div className="flex justify-between">
          <h1 className="font-bold text-4xl text-primary_500">Fontes</h1>
          <div>
            <button
              className="text-lg hover:text-colorRedDark"
              onClick={() => logoutUser()}
            >
              sair
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
