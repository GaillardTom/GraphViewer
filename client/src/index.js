import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuard from './guard/AuthGuard';
import './index.css';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Upload from './views/Upload';
import NotFound from './views/NotFound';
import Protected from './views/Protected';
import Graph from './views/Graph';
import Input from './views/Input';
import GraphImage from './views/GraphImage';

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
            <Route path="upload" element={<Upload />} />
            <Route path="input" element={<Input />} />
            <Route path="*" element={<NotFound />} />
            <Route path="graphimage" element={<GraphImage />} />
          </Route>
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
