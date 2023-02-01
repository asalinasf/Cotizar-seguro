import { createContext, useState } from "react";
import {
  obtenerDiferenciaYear,
  calcularMarca,
  calcularPlan,
  formatearDinero,
} from "../helpers/index";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState(0);

  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    // Una base
    let resultado = 2000;
    // Obtener diferencia de "years"
    const diferencia = obtenerDiferenciaYear(datos.year);
    // Hay que restar el 3% por cada "year"
    resultado -= (diferencia * 3 * resultado) / 100;

    // Europeo 30%
    // Americano 15%
    // Asiatico 5%
    resultado *= calcularMarca(datos.marca);
    // Básico 20%
    // Completo 50%
    resultado *= calcularPlan(datos.plan);

    // Formatear Dinero
    resultado = formatearDinero(resultado);
    setCargando(true);
    setTimeout(() => {
      setResultado(resultado);
      setCargando(false);
    }, 2500);
  };

  return (
    <CotizadorContext.Provider
      value={{
        handleChangeDatos,
        datos,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
