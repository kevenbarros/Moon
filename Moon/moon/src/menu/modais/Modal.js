import React from 'react'; //react

import '../../styles/Modal.scss'; //css

import voltar from '../../assets/voltar.svg'; //img

//hooks
import { useDate } from '../../Huks/useDate';
import { useFiltro } from '../../Huks/useFiltro';

function Modal({ setModal, id, mes }) {
  const now = new Date(id.dataFinal);
  // para visualização se a conta atual já foi paga
  //ex: conta do mes do filtro  ========= paga sim
  const [confirmaçãoDePg, setConfirmaçãoDePg] = React.useState(false);
  // para visualização de quantas contas já foram pagas
  //ex: 3/4 contas pagas
  const [pgPagos, setPgPagos] = React.useState(0);

  //data
  const dataDeInico = useDate(id.data);
  const dataDefim = useDate(id.dataFinal);
  const mesDofiltro = useFiltro(mes);
  console.log(mesDofiltro);

  //fechar o modal
  async function handleOutSideClick(event) {
    //set modal que vem do MenuVisu
    setModal(false);

    if (event.target === event.currentTarget) {
      setModal(false);
    }
  }
  React.useEffect(() => {
    //percorrendo o MesPArcelado para achar a conta especifica atual fracionada
    id.mesparcelado.map((pagamentoMes) => {
      let mesFiltrado = new Date();
      if (mesDofiltro != 'atual') {
        mesFiltrado.setMonth(mesDofiltro);
      }

      let datames = new Date(pagamentoMes.dataConta);
      if (mesFiltrado.getUTCMonth() == datames.getUTCMonth()) {
        //verifica se tá pago ou não para mostrar no html
        setConfirmaçãoDePg(pagamentoMes.pg);
      }
      //para mostrar quantas contas estão pagas para mostrar no html
      if (pagamentoMes.pg) {
        setPgPagos(pgPagos + 1);
      }
    });
  }, []);
  return (
    <div className="modal">
      <main>
        <button onClick={handleOutSideClick}>
          {' '}
          <img src={voltar} alt="voltar" />
          voltar
        </button>
        {id.tipo == 'Pagamento avista' ? (
          <span>
            <p>pago</p> <h4>{id.checkedPagamento == true ? 'sim' : 'não'}</h4>
          </span>
        ) : (
          <span>
            <p>pago</p> <h4>{confirmaçãoDePg ? 'sim' : 'Não'}</h4>
          </span>
        )}
        <span>
          <p>Empresa </p> <h4>{id.entidade}</h4>
        </span>
        <span>
          <p>Nome</p> <h4>{id.nome}</h4>
        </span>
        <span>
          <p>Data da compra </p> <h4> {dataDeInico}</h4>
        </span>
        <span>
          <p>Produto </p> <h4> {id.produto}</h4>
        </span>
        <span>
          <p>Valor </p> <h4>R$ {id.contaF}</h4>
        </span>
        <span>
          <p>Parcelamento </p> <h4> {id.parcelamento}</h4>
        </span>
        <span>
          <p>Valor parcelamento </p> <h4>R$ {id.valorParcelamento}</h4>
        </span>
        <span>
          <p>Parcelamento pagas</p>{' '}
          <h4>
            {' '}
            {pgPagos}/{id.parcelamento == 'avista' ? '1' : id.parcelamento}
          </h4>
        </span>
        <span>
          <p>Data final </p>
          <h4>{dataDefim == 'Invalid Date' ? 'avista' : dataDefim}</h4>
        </span>

        <span>
          <p>Grupo </p> <h4> {id.grupo}</h4>
        </span>
        <span>
          <p>Observação</p>
        </span>
        <span>
          <h4>{id.obs}</h4>
        </span>
      </main>
    </div>
  );
}

export default Modal;
