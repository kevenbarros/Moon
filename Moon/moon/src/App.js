import React from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Entrar from './pages/Entrar';
import Home from './pages/Home';

import { AuthContextProvider } from './context/AuthContext';
import Cadastrar from './pages/Cadastrar';
import MenuPost from './menu/MenuPost';
import MenuStats from './menu/MenuStats';
import MenuVisu from './menu/MenuVisu';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sala/entrar" component={Entrar} />
          <Route path="/sala/cadastro" component={Cadastrar} />
          <Route path="/sala/:id" component={MenuVisu} />
          <Route path="/estatistica/:id" component={MenuStats} />
          <Route path="/post/:id" component={MenuPost} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
