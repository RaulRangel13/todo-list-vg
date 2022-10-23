import React from 'react';
import './App.css';
import { Login } from './pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TodoList } from './pages/todolist';
import { AuthContextProvider } from './contexts/authContext';
import { TodoPrivate } from './pages/private';
import { Header } from './pages/header';
import { Signup } from './pages/signup';

function App() {
  return (
    <div >
 
        <Header />
        <Routes>
            <Route path='/' element={<TodoPrivate><TodoList /></TodoPrivate> }/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
        </Routes>

    </div>
  );
}

export default App;
