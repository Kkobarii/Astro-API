import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { FirstComponent } from "./components/Component";
import { PropsComponent } from "./components/Component";
import UserList from "./hooks/Hook";
import { Planet } from "./components/planet/Planet";

function App() {
  return (
    <div className="App">
      <FirstComponent />
      <PropsComponent firstName="Jožko" lastName="Mrkvička" />
      <PropsComponent firstName="Žožko" lastName="Placička" />
      <PropsComponent firstName="Božo" lastName="Ředkvička" />
      <Planet />
    </div>
  );
}

export default App;
