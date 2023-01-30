import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import Menu from "./layouts/Menu";
import Index from "./pages";
import Edit from "./pages/edit";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Menu />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
