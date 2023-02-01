import useCotizador from "../hooks/useCotizador";

const Error = () => {
  const { error } = useCotizador();

  return (
    <div className="border text-center border-red-400 text-red-700 bg-red-100 font-bold">
      <p>{error}</p>
    </div>
  );
};

export default Error;
