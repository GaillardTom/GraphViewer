import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuard from './guard/AuthGuard';
import './index.css';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Protected from './views/Protected';
import Graph from './views/Graph';
export default function App() {


  return (
    <BrowserRouter>
      <AuthGuard>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path='register' element={<Register/>}/>
            <Route path="login" element={<Login />} />
            <Route path='graphs' element={<Graph/>} />
            <Route path="protected" element={<Protected />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
