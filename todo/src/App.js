import React from 'react'
import './App.css';
import Header from './components/Header';
import AddForm from './components/AddForm';
import Todos from './components/Todos'
import {Provider} from './context';

function  App(){
  return (
    <Provider>
    <div className="app">
      <Header/>
      <AddForm/>
      <Todos/>
    </div>
    </Provider>
  );
}

export default App;
