import React from "react";

import Routes from "./App.routes";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Header />
      {/* TODO se for adicionar o home vai ser necessário ajustar HEADER E SIDEBAR */}
      <div id="conteudo">
        <Routes />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
