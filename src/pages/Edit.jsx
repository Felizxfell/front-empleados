import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "../components/Select";

const URLAPI = "https://localhost:7121/api/Empleado";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empleadConsult, setEmpleadConsult] = useState(null);
  const form = useRef(null);

  if (id) {
    useEffect(() => {
      fetch(`${URLAPI}/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
          setEmpleadConsult(data[0]);
        })
        .catch((e) => console.log(e));
    }, []);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const bodyjson = {
      empleadoId: Number(id),
      nombre: formData.get("nombre"),
      apellido: formData.get("apellido"),
      puestoId: Number(formData.get("puesto")),
    };
    console.log(bodyjson);
    try {
      const request = await fetch(URLAPI, {
        method: "put",
        body: bodyjson,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await request.text();
      if (data) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className="lg:mx-20 xl:mx-40 bg-gray-900 p-10"
    >
      <div className="mb-6">
        <label
          htmlFor="nombre"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nombre Empleado"
          defaultValue={empleadConsult?.nombre}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="apellido"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Apellido
        </label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Apellido Empleado"
          defaultValue={empleadConsult?.apellido}
          required
        />
      </div>
      <div className="mb-6">
        <Select puestoId={empleadConsult?.puestoId} />
      </div>
      <div className="grid justify-items-center">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-48 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
        >
          Guardar
        </button>
      </div>
    </form>
  );
}