// react
import React from 'react';
import { useParams } from 'react-router';
//scss
import '../styles/visu.scss';
import '../styles/sala.scss';
import '../styles/Modal.scss';
//img
import lixeiro from '../assets/delete.svg';
import olho from '../assets/olho.svg';
import edit from '../assets/edit.svg';

//hooks
import { useRoom } from '../Huks/useRoom';
import useMedia from '../Huks/useMedia';
import { database } from '../servese/firebase';

//componentes
import Menu from '../components/Menu';
import Modal from './modais/Modal';
import ModalEditar from './modais/ModalEditar';
import FiltroMes from './filtros/FiltroMes';

import MenuFiltro from './filtros/MenuFiltro';
import { useAuth } from '../Huks/useAuth';

function Sala() {
  //parametros react
  const params = useParams();
  const RoomId = params.id;
  // hooks
  const { renda, contasF } = useRoom(RoomId);
  const invertidoContasF = contasF.slice(0).reverse();
  // states
  const [conta, setConta] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [idConta, setIdConta] = React.useState();
  const [modalEdit, setModalEdit] = React.useState(false);
  const [objetoDeConta, setObjetoDeConta] = React.useState('');

  //filtro mes
  const [filtroMes, setFiltroMes] = React.useState(false);
  const [mes, setMes] = React.useState('');
  // mobile
  const mobile = useMedia('(max-width: 40rem)');
  //auth
  const { EntrarGoogle, user } = useAuth();

  function effectDeUser() {
    if (user) {
      console.log(user?.nome);
    } else {
      console.log('nao existe');
    }
  }
  //função que muda o stado de set modal abrindo assim o modal de visualização
  function abrirModal(obj) {
    setModal(true);
    setObjetoDeConta(obj);
  }
  //função que muda o stado de set modal abrindo assim o modal de editar
  function ModalEd(obj, id) {
    setModalEdit(true);
    setIdConta(id);
    setObjetoDeConta(obj);
  }

  //função que deleta a conta
  async function DeleteConta(questionId) {
    if (window.confirm('tem certeza que quer excluir essa conta ?')) {
      await database.ref(`sala/${RoomId}/conta/${questionId}`).remove();
    }
  }
  //função que é chamada apartir do useEffect que exclui a conta depois de 1 ano
  async function DeleteContaAutomatico(Id, conta, data) {
    await database.ref(`sala/${RoomId}/conta/${Id}`).remove();
  }

  React.useEffect(() => {
    effectDeUser();
    setConta([]);
    //função que mostra todas as contas do mês
    invertidoContasF.map((item) => {
      //setando data para calculos
      let dataConta = new Date(item.data);
      let dataFinal = new Date(item.dataFinal);
      let data = new Date();

      //contas fixas são adicionado diretamente
      if (item.dataFinal == 'avista' && item.grupo == 'conta Fixa') {
        setConta((conta) => [...conta, item]);
      }
      //contas avista só vai aparecer se for no mesmo mes que foi comprado
      if (
        item.dataFinal == 'avista' &&
        dataConta.getUTCMonth() == data.getMonth() &&
        item.grupo != 'conta Fixa'
      ) {
        setConta((conta) => [...conta, item]);
      }
      //virificar as contas atuais
      if (
        dataFinal.getFullYear() > data.getFullYear() ||
        (dataFinal.getMonth() >= data.getMonth() &&
          dataConta.getUTCMonth() <= data.getMonth())
      ) {
        setConta((conta) => [...conta, item]);
      }
    });

    //função que verifica a conta ja passou a 1 ano
    function removeContapassada() {
      let data = new Date();

      invertidoContasF.map((i) => {
        let Final = new Date(i.dataFinal);

        if (
          Final.getUTCFullYear() < data.getUTCFullYear() &&
          Final.getUTCMonth() == data.getUTCMonth()
        ) {
          //chama a função que deleta
          DeleteContaAutomatico(i.id);
        }
      });
    }

    removeContapassada();
  }, [renda, contasF]);
  return (
    <>
      <Menu />

      {modal && (
        <Modal
          setModal={setModal}
          id={objetoDeConta}
          RoomId={RoomId}
          mes={mes}
        />
      )}
      {modalEdit && (
        <ModalEditar
          setModal={setModalEdit}
          id={idConta}
          RoomId={RoomId}
          arrayConta={objetoDeConta}
        />
      )}

      <main id="page-room">
        <section className="seção">
          {user ? (
            <></>
          ) : (
            <>
              <p className="autenticacaoGoogle">
                Clique <a onClick={EntrarGoogle}>aqui</a> para entrar com a
                Google
              </p>
              <p className="aviso">
                (sem autenticação você nao pode criar nem editar qualquer campo)
              </p>
            </>
          )}
          <MenuFiltro
            setFiltroMes={setFiltroMes}
            setMes={setMes}
            mes={mes}
            filtroMes={filtroMes}
          />{' '}
          {filtroMes ? (
            <FiltroMes
              RoomId={RoomId}
              mes={mes}
              setMes={setMes}
              setFiltroMes={setFiltroMes}
              filtroMes={filtroMes}
            />
          ) : (
            <table className="tabela" border="0">
              <tr>
                <th>Data </th>
                <th>Produto </th>
                <th>Valor </th>
                {!mobile && <th>Parcelas</th>}
                {!mobile && <th>status </th>}
              </tr>

              {conta.map((i, index) => {
                let pagoENaoPago;
                //pega o pagamento do mes atual para o pop up-------------
                let PgMesAtual;
                i.mesparcelado.map((item) => {
                  let datames = new Date(item.dataConta);
                  let mes = new Date();
                  if (datames.getUTCMonth() == mes.getUTCMonth()) {
                    PgMesAtual = item.pg;
                  }
                });
                //--------------------------------------------------------
                //pega todos os itens para o popup -------------------------------
                let objetoConta = {
                  contaF: i.contaF,
                  entidade: i.entidade,
                  nome: i.nome,
                  produto: i.produto,
                  obs: i.obs,
                  data: i.data,
                  grupo: i.grupo,
                  dataFinal: i.dataFinal,
                  valorParcelamento: i.valorParcelamento,
                  parcelamento: i.parcelamento,
                  tipo: i.tipo,
                  pagar: i.pagar,
                  pagarMesmoMes: i.pagarMesmoMes,
                  checkedPagamento: i.checkedPagamento,
                  mesparcelado: i.mesparcelado,
                  pgDesseMes: PgMesAtual,
                };
                objetoConta.mesparcelado.map((pagamentoMes) => {
                  let mes = new Date();
                  let datames = new Date(pagamentoMes.dataConta);

                  if (datames.getUTCMonth() == mes.getUTCMonth()) {
                    pagoENaoPago = pagamentoMes.pg;
                  }
                });
                //~---------------------------------------------------------------
                return (
                  <tr key={index} className={`${index % 2 == 0 && 'cortable'}`}>
                    <td width="13%">{i.data}</td>
                    <td width="18%">{i.produto}</td>

                    <td>{`R$ ${i.contaF}`}</td>
                    {!mobile && <td width="5%">{i.parcelamento}</td>}

                    {!mobile && <td>{pagoENaoPago ? 'Pago' : 'Não pago'}</td>}

                    <td
                      style={{ padding: '1.3rem 0rem 1.3rem 0rem' }}
                      width="0"
                    >
                      <button
                        onClick={() => abrirModal(objetoConta)}
                        className="visualizador"
                      >
                        <img src={olho} alt="apagar conta" /> <p>visualizar</p>
                      </button>
                    </td>
                    <td style={{ padding: '1.3rem 0rem 1.3rem 0rem' }}>
                      <button
                        onClick={() => ModalEd(objetoConta, i.id)}
                        className="deletar"
                      >
                        <img src={edit} alt="editar conta" />
                        {!mobile && (
                          <p style={{ marginRight: '5px' }}>Editar </p>
                        )}
                      </button>
                    </td>
                    <td style={{ padding: '1.3rem 1rem 1.3rem 0rem' }}>
                      <button
                        onClick={() => DeleteConta(i.id)}
                        className="deletar"
                      >
                        <img src={lixeiro} alt="apagar conta" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          )}
        </section>
      </main>
    </>
  );
}

export default Sala;
