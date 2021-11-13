import React from 'react';

//import imgs
import ImgHome from '../assets/imgHomeFundo.svg';
import logo from '../assets/logo192.svg';

//import componentes
import Botao from '../components/Botao';

//import estilos
import '../styles/auth.scss';
import Input from '../components/Input';
//outros
import { useAuth } from '../Huks/useAuth';
import useForm from '../Huks/useForm.js';
import { database } from '../servese/firebase';
import { useHistory } from 'react-router';
//popUp
import PopUpError from '../popup/PopUpError';
//teste mask
import InputMask from '../mask/InputMask';

function Cadastrar() {
  const { EntrarGoogle, user } = useAuth();
  const history = useHistory();
  const renda = useForm();
  const cpf = useForm();
  const [cpfSemPontos, setCpfSemPontos] = React.useState('');
  //error de cadastro
  const [popUpError, setPopUpError] = React.useState(false);

  //função que dispara o popUp
  async function ativarPopUpError() {
    await setPopUpError(true);
    setTimeout(() => {
      setPopUpError(false);
    }, 1300);
  }

  //cria a sala
  async function handleRoom(e) {
    e.preventDefault();

    if (renda.value.trim() == '') {
      return;
    }
    const naoRepetir = await database.ref(`sala/${cpfSemPontos}`).get();
    if (naoRepetir.exists()) {
      ativarPopUpError();
      return;
    }

    const referencia = database.ref(`sala`).child(`/${cpfSemPontos}`);
    const firebaseSala = await referencia.set({
      renda: renda.value,
      autor: user?.id,
      cpf: cpf.value,
    });

    history.push(`/sala/${cpfSemPontos}`);
  }
  React.useEffect(() => {
    let variavel2 = cpf.value.replace('.', ''); //remove UM ponto
    variavel2 = variavel2.replace('.', ''); //remove UMA virgula
    variavel2 = variavel2.replace('-', ''); //remove UM traço
    setCpfSemPontos(variavel2);
  }, [cpf.value]);

  return (
    <>
      {popUpError && <PopUpError texto="Cpf já cadastrado" />}
      <div id="page-auth">
        <aside>
          <img
            src={ImgHome}
            alt="ilustraçao simbolizando perguntas e resposta"
          />
          <h1>Administre seu negocios pessoais e empresariais com a Moon</h1>
          <h2>Controle de custo prático e eficiente</h2>
        </aside>
        <main>
          <div className="main-content">
            <img src={logo} className="imgLogo" alt="logo do site " />
            <h2>{user?.nome}</h2>
            <div className="separator"> - - - - </div>
            <form onSubmit={handleRoom}>
              <Input
                className="input"
                placeholder="R$0.00"
                id="Renda"
                label="Renda"
                type="text"
                {...renda}
              />
              <InputMask
                className="input"
                placeholder="000.000.000-00"
                id="cpf"
                label="cpf"
                type="text"
                mask="cpf"
                {...cpf}
              />

              <Botao type="submmit">entrar</Botao>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default Cadastrar;
