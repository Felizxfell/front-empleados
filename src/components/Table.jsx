import { useEffect, useState } from "react";
// import { CiEdit, CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";

const URLAPI = "https://localhost:7121/api/Empleado";

export default function Table({ updatelista, setUpdatelista }) {
  const [empleados, setEmpleados] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(URLAPI)
      .then((resp) => resp.json())
      .then((data) => {
        setEmpleados(data);
        setLoader(false);
        setUpdatelista(false);
      })
      .catch((e) => console.log(e));
  }, [updatelista]);

  const handleDelete = async (id) => {    
    try {
      const request = await fetch(`${URLAPI}/?id=${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await request.text();
      if (data) {
        setUpdatelista(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative overflow-x-auto mt-10 rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Apellido
            </th>
            <th scope="col" className="px-6 py-3">
              Puesto
            </th>
            <th scope="col" className="px-6 py-3">
              Editar
            </th>
            <th scope="col" className="px-6 py-3">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody>
          {loader && (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                colSpan="6"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
              >
                Cargando...
              </th>
            </tr>
          )}

          {empleados.map((empleado) => (
            <tr
              key={empleado.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {empleado.id}
              </th>
              <td className="px-6 py-4">{empleado.nombre}</td>
              <td className="px-6 py-4">{empleado.apellido}</td>
              <td className="px-6 py-4">{empleado.puesto}</td>
              <td className="px-6 py-4 dark:text-white">
                <Link to={`/edit/${empleado.id}`}>Editar</Link>
              </td>
              <td
                className="px-6 py-4 dark:text-white delete-e"
                onClick={() => handleDelete(empleado.id)}
              >
                Eliminar
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
