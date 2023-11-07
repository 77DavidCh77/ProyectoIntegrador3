import { Link } from "react-router-dom";

import { FaClipboardList, FaHouse, FaFloppyDisk } from "react-icons/fa6";
import Options from "./Options";
import { useEffect, useState } from "react";
import useHome from "../hooks/useHome";
import useHistorial from "../hooks/useHistorial";
import Swal from "sweetalert2";
const Home = () => {
  const [precio, setPrecio] = useState(0);
  const [datos, setDatos] = useState([]);
  const { elementos, setElementos } = useHome();
  const { historial, setHistorial } = useHistorial();
  const realizarCotizacion = () => {
    const { metros2, propiedad, ubicacion } = elementos;
    console.log(metros2, propiedad, ubicacion);
    if (metros2 < 20 || propiedad == 0 || ubicacion == 0) {
      Swal.fire("Error", "Debes completar los datos", "error");
    }
    const cuenta = 5000 * metros2 * propiedad * ubicacion;
    setPrecio(cuenta);
  };
  const guardar = () => {
    setHistorial([
      ...historial,
      {
        fecha: new Date().toDateString(),
        ...elementos,
        cuenta:
          5000 * elementos.metros2 * elementos.propiedad * elementos.ubicacion,
      },
    ]);
    setPrecio(0);
  };
  useEffect(() => {
    const leer = async () =>
      setDatos(await (await fetch("/datos.json")).json());
    leer();
  }, []);

  return (
    <>
      <h1 className="center separador">
        Seguros del hogar <FaHouse />
        <nav>
        <Link to={"/historial"} title="ver Historial" className="historial-link">
  <FaClipboardList className="clipboard-icon" />
</Link>
        </nav>
      </h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="center div-cotizador"
      >
        <h2 className="center separador">Completa los datos solicitados</h2>
        <Options
          datos={datos.filter(({ categoria }) => categoria == "propiedad")}
          label={"Tipo de propiedad"}
          tipo={"propiedad"}
        />
        <Options
          datos={datos.filter(({ categoria }) => categoria == "ubicacion")}
          label={"Tipo de ubicacion"}
          tipo={"ubicacion"}
        />
        <fieldset>
          <label htmlFor="metros2">Ingresar los Metros cuadrados:</label>
          <input
            type="number"
            id="metros2"
            defaultValue={20}
            min="20"
            max="500"
            onInput={(e) =>
              setElementos({
                ...elementos,
                metros2: isNaN(parseInt(e.target.value))
                  ? 20
                  : parseInt(e.target.value) < 20
                  ? 20
                  : parseInt(e.target.value),
              })
            }
          />
        </fieldset>

        <fieldset className="center separador">
          <button type="button" onClick={realizarCotizacion}>
            cotizar
          </button>
        </fieldset>
      </form>
      {precio != 0 && (
        <section className="center separador">
          <p className="importe">Precio estimado: $ {precio.toFixed(2)} </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <button type="button" onClick={guardar}>
              Guardar
            </button>
          </form>
          <FaFloppyDisk
            className="guardar ocultar"
            title="Guardar en historial"
          />
        </section>
      )}
    </>
  );
};
export default Home;
