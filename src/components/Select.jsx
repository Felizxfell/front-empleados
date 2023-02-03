import { useEffect, useState } from "react";

const URLAPI = "https://localhost:7121/api/Puesto";

export default function Select({ puestoId }) {
  const [puestos, setPuestos] = useState([]);
  const [value, setValue] = useState(puestoId ? puestoId : 0);

  useEffect(() => {
    fetch(URLAPI)
    .then((resp) => resp.json())
    .then((data) => setPuestos(data));    
  }, [puestoId]);


  const handleChange = e => {
    setValue(e.target.value)
  }

  return (
    <>
      <label
        htmlFor="puesto"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >                
        <select
          value={value}
          onChange={handleChange}
          id="puesto"
          name="puesto"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="0">PUESTOS</option>
          {puestos.map(puesto => (
            <option key={puesto.id} value={puesto.id}>{puesto.nombre}</option>
          ))}
        </select>
      </label>
    </>
  );
}
