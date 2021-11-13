import React from 'react';

//import imgs
import ImgHome from '../assets/imgHomeFundo.svg';
import logo from '../assets/logo192.svg';

//import componentes
import Botao from '../components/Botao';

//import estilos
import '../styles/auth.scss';

//outros
import { useAuth } from '../Huks/useAuth';
import useForm from '../Huks/useForm.js';
import { database } from '../servese/firebase';
import { useHistory } from 'react-router';
import InputMask from '../mask/InputMask';
function Cadastro() {
  const { EntrarGoogle, user } = useAuth();
  const key = useForm();
  const [keySemPontos, setKeySemPontos] = React.useState('');

  const history = useHistory();

  //retira os pontos do cpf
  React.useEffect(() => {
    let variavel2 = key.value.replace('.', ''); //remove UM ponto
    variavel2 = variavel2.replace('.', ''); //remove UMA virgula
    variavel2 = variavel2.replace('-', ''); //remove UM traço
    setKeySemPontos(variavel2);
  }, [key.value]);

  async function nevegarCriar(e) {
    e.preventDefault();
    history.push(`/sala/cadastro`);
  }

  async function EntrarComChave(e) {
    e.preventDefault();
    if (keySemPontos.trim() == '') {
      return;
    }
    const refSala = await database.ref(`sala/${keySemPontos}`).get();
    if (!refSala.exists()) {
      alert('esté código não está vinculado a nenhuma sala');
      return;
    }

    history.push(`/sala/${keySemPontos}`);
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
          <h2>{user?.nome}</h2>
          <form onSubmit={nevegarCriar}>
            <Botao type="submmit">criar nova</Botao>
          </form>

          <div className="separator">entrar com cpf</div>
          <form onSubmit={EntrarComChave}>
            <InputMask placeholder="000.000.000-00" mask="cpf" {...key} />

            <Botao type="submmit">Entrar com cpf</Botao>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Cadastro;
