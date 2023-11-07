import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa6";
import useHistorial  from "../hooks/useHistorial";
import Valor from "./Valor";
const Historial = () => {
  const { historial, setHistorial } = useHistorial();
  const borrarHistorial = () => {
    setHistorial([]);
  };
  return (
    <>
      <h1 className="center separador">
        Ver Historial<nav className="center separador">
        <Link to={"/"} title="Ir al Home" className="home-link">
  <FaClipboardList className="clipboard-list-icon" />
</Link>
      </nav>
      </h1>
      <h1 className="center separador"> Precio Estimado</h1>
      <section className=" center div-cotizador">
        <ul>
          {historial.map((elemento, indice) => (<Valor key={indice} {...elemento}/> ))}
        </ul>
      </section>
      <button onClick={borrarHistorial}>Borrar Historial</button>
    </>
  );
};

export default Historial;
