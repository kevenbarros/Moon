import { ReactComponent as Estatistica } from '../assets/estatisticas.svg';
import { ReactComponent as Adicionar } from '../assets/adicionar.svg';
import { ReactComponent as Visualizacao } from '../assets/feed.svg';
import { ReactComponent as Copy } from '../assets/copy.svg';
import logo from '../assets/logo192.svg';
import CopyCod from '../components/CopyCod';
import useMedia from '../Huks/useMedia';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useRoom } from '../Huks/useRoom';

function Menu() {
  const params = useParams();
  const RoomId = params.id;
  const mobile = useMedia('(max-width: 40rem)');
  const history = useHistory();
  const { renda, contasF, cpfDb } = useRoom(RoomId);

  return (
    <header className="content-head">
      <img src={logo} alt="logo da empresa" />

      <section className="menu">
        <div className="conteiner-button">
          <button
            className="button"
            onClick={() => {
              history.push(`/estatistica/${RoomId}`);
            }}
          >
            <Estatistica />
          </button>
          {!mobile && 'Estatistica'}
        </div>
        <div className="conteiner-button">
          <button
            className="button"
            onClick={() => {
              history.push(`/sala/${RoomId}`);
            }}
          >
            <Visualizacao />
          </button>
          {!mobile && 'Visualização'}
        </div>
        <div className="conteiner-button">
          <button
            className="button"
            onClick={() => {
              history.push(`/post/${RoomId}`);
            }}
          >
            <Adicionar />
          </button>
          {!mobile && 'Criar conta'}
        </div>
        <div className="conteiner-button">
          {mobile ? (
            <button className="copybutton">
              <Copy />
            </button>
          ) : (
            <CopyCod code={cpfDb} />
          )}
          {!mobile && 'Cpf de acesso'}
        </div>
      </section>
    </header>
  );
}

export default Menu;
