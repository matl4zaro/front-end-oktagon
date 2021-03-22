import React from "react";

import Routes from "./App.routes";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// TODO: Implementar uma página "home" ao projeto
// TODO: Implementar testes unitários

function App() {
  return (
    <div>
      <Header />
      {/* FIXME: se for adicionar o home vai ser necessário ajustar HEADER E SIDEBAR */}
      <div id="conteudo">
        <Routes />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
