import { useGlobalContext } from "../context/app.Context";

const Navbar = () => {
  const { logoutUser } = useGlobalContext();
  return (
    <nav className="flex justify-between">
      <h1 className="font-bold text-4xl text-primary_500">Fontes</h1>
      <div>
        <button
          className="text-lg hover:text-colorRedDark"
          onClick={() => logoutUser()}
        >
          sair
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
