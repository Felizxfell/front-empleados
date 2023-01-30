import { useState } from "react";
import Form from "../components/Form";
import Table from "../components/Table";

const Index = () => {
  const [updatelista, setUpdatelista] = useState(false);

  return (
    <main className="container mx-auto place-content-center bg-gray-900 p-10 rounded-md">
      <h1 className="text-left font-bold ">Empleados</h1>
      <Form setUpdatelista={setUpdatelista} />
      <Table updatelista={updatelista} setUpdatelista={setUpdatelista} />
    </main>
  );
};

export default Index;
