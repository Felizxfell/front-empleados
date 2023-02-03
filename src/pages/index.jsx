import Form from "../components/Form";
import Table from "../components/Table";
import useEmpleados from "../hooks/useEmpleados";

const Index = () => {
  const {
    empleados,
    loader,
    
    eliminarEmpleado,
    guardaEmpleado,
    editarEmpleado
  } = useEmpleados();

  return (
    <main className="container mx-auto place-content-center bg-gray-900 p-10 rounded-md">
      <h1 className="text-left font-bold ">Empleados</h1>
      <Form guardaEmpleado={guardaEmpleado} />
      <Table
        loader={loader}
        empleados={empleados}
        handleEdit={editarEmpleado}
        handleDelete={eliminarEmpleado}
      />
    </main>
  );
};

export default Index;
