import React from 'react';

//import imgs
import ImgHome from '../assets/imgHomeFundo.svg';
import logo from '../assets/logo192.svg';
import Googleimg from '../assets/google-icon.svg';

//import componentes
import Botao from '../components/Botao';

//import estilos
import '../styles/auth.scss';
import { useHistory } from 'react-router';

//outros
import { auth, database, firebase } from '../servese/firebase.js';
import { useAuth } from '../Huks/useAuth';

import useForm from '../Huks/useForm';

function Home() {
  const history = useHistory();
  const { EntrarGoogle, user } = useAuth();

  async function CriarCadastro() {
    if (!user) {
      await EntrarGoogle();
    }
    history.push('/sala/entrar');
  }
  return (
    <div id="page-auth">
      <aside>
        <img src={ImgHome} alt="ilustraçao simbolizando perguntas e resposta" />
        <h1>Administre seu negocios pessoais e empresariais com a Moon</h1>
        <h2>Controle de custo prático e eficiente</h2>
      </aside>
      <main>
        <div className="main-content">
          <img src={logo} className="imgLogo" alt="logo do site " />
          <button className="creat-room" onClick={CriarCadastro}>
            <img src={Googleimg} alt="logo do google" />
            Entre com a Google
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;
