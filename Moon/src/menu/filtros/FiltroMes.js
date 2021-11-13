import React from 'react';
import '../../styles/visu.scss';
import '../../styles/sala.scss';
import { useRoom } from '../../Huks/useRoom';
import lixeiro from '../../assets/delete.svg';
import olho from '../../assets/olho.svg';
import { database } from '../../servese/firebase';
import Modal from '../modais/Modal';
import useMedia from '../../Huks/useMedia';
import MenuFiltro from './MenuFiltro';

function FiltroMes({ RoomId, mes, setMes, setFiltroMes, filtroMes }) {
  const { renda, contasF } = useRoom(RoomId);
  const invertidoContasF = contasF.slice(0).reverse();
  const [conta, setConta] = React.useState([]);
  const [data, setData] = React.useState(Date.now());
  const [modal, setModal] = React.useState(false);
  const [idConta, setIdConta] = React.useState();
  const [modalEdit, setModalEdit] = React.useState(false);
  const [objetoDeConta, setObjetoDeConta] = React.useState('');
  const mobile = useMedia('(max-width: 40rem)');

  //abre modal
  function abrirModal(obj) {
    setModal(true);
    setObjetoDeConta(obj);
  }

  //deleta conta
  async function DeleteConta(questionId) {
    if (window.confirm('tem certeza que quer excluir essa conta ?')) {
      await database.ref(`sala/${RoomId}/conta/${questionId}`).remove();
    }
  }

  React.useEffect(() => {
    setConta([]);
    //função que mostra todas as contas do mês
    invertidoContasF.map((item) => {
      item.mesparcelado.map((i) => {
        let dataConta = new Date(i.dataConta);

        if (mes == 'janeiro' && dataConta.getUTCMonth() == 0) {
          setConta((conta) => [...conta, item]);
        }
        if (mes == 'fevereiro' && dataConta.getUTCMonth() == 1) {
          setConta((conta) => [...conta, item]);
        }
        if (mes == 'março' && dataConta.getUTCMonth() == 2) {
          setConta((conta) => [...conta, item]);
        }
        if (mes == 'abril' && dataConta.getUTCMonth() == 3) {
          setConta((conta) => [...conta, item]);
        }
        if (mes == 'maio' && dataConta.getUTCMonth() == 4) {
          setConta((conta) => [...conta, item]);
        }
        if (mes == 'junho' && dataConta.getUTCMonth() == 5) {
          setConta((conta) => [...conta, item]);
        }
        if (mes == 'julho' && dataConta.getUTCMonth() == 6) {
          setConta((conta) => [...conta, item]);
        }
        if (mes == 'agosto' && dataConta.getUTCMonth() == 7) {
          setConta((conta) => [...conta, item]);
        }
        if (mes == 'setembro' && dataConta.getUTCMonth() == 8) {
          setConta((conta) => [...conta, item]);
        }
        if (mes == 'outubro' && dataConta.getUTCMonth() == 9) {
          setConta((conta) => [...conta, item]);
        }
        if (mes == 'novembro' && dataConta.getUTCMonth() == 10) {
          setConta((conta) => [...conta, item]);
        }
        if (mes == 'dezembro' && dataConta.getUTCMonth() == 11) {
          setConta((conta) => [...conta, item]);
        }
      });
    });
  }, [renda, contasF]);

  return (
    <>
      {modal && (
        <Modal
          setModal={setModal}
          id={objetoDeConta}
          RoomId={RoomId}
          mes={mes}
        />
      )}

      <div id="page-room">
        <section className="seção">
          <table className="tabela" border="0">
            <thead>
              <tr>
                <th>Data </th>
                <th>Produto </th>
                <th>Valor </th>
                {!mobile && <th>Parcelas</th>}
                {!mobile && <th>status </th>}
              </tr>
            </thead>
            <tbody>
              {conta.map((i, index) => {
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
                };
                return (
                  <tr key={index} className={`${index % 2 == 0 && 'cortable'}`}>
                    <td width="13%">{i.data}</td>
                    <td width="18%">{i.produto}</td>
                    <td>{`R$ ${i.contaF}`}</td>
                    {!mobile && <td width="5%">{i.parcelamento}</td>}
                    {!mobile && (
                      <td>{i.checkedPagamento ? 'Pago' : 'Não pago'}</td>
                    )}

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
            </tbody>
          </table>
        </section>
        {conta.length == 0 && (
          <center>
            <h2>Não há contas para esse mês</h2>
          </center>
        )}
      </div>
    </>
  );
}

export default FiltroMes;
