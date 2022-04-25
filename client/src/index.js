import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuard from './guard/AuthGuard';
import './index.css';
import Home from './views/Home';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Protected from './views/Protected';

export default function App() {

  return (
    <BrowserRouter>
      <AuthGuard>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="protected" element={<Protected />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
