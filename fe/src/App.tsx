import React from 'react';
import logo from './logo.svg';
import './App.css';

import {FirstComponent} from './components/Component'
import {PropsComponent} from './components/Component'
import UserList from './hooks/Hook'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <FirstComponent />
      <PropsComponent firstName="Jožko" lastName="Mrkvička" />
      <PropsComponent firstName="Žožko" lastName="Placička" />
      <PropsComponent firstName="Božo" lastName="Ředkvička" />
      
    </div>
  );
}

export default App;
