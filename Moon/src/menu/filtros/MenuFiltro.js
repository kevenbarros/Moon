import React from 'react';

import '../../styles/visu.scss';
import '../../styles/sala.scss';

import Select from '../../components/Select';

//img
import clear from '../../assets/clear.svg';
import filter from '../../assets/filter.svg';
function MenuFiltro({ setFiltroMes, setMes, mes, filtroMes }) {
  const [mesAnterior, setMesAnterior] = React.useState('');

  //verificação de filtro
  async function filtrarPorMes() {
    //verifica se o filtro ta vazio
    if (mes == '') {
      return;
    }
    // verifica se mes atual do filtro é igual ao mes que foi posto anteriormente
    if (filtroMes == true && mes == mesAnterior) {
      return;
    }
    // verifica se mes atual do filtro é igual ao mes que foi posto anteriormente
    if (filtroMes == true && mes != mesAnterior) {
      await setFiltroMes(false);
      await setFiltroMes(true);
      setMesAnterior(mes);
    } else {
      setFiltroMes(true);
      setMesAnterior(mes);
    }
  }

  //função que limpa o filtro
  function limparFiltro() {
    setFiltroMes(false);
    setMes('');
  }

  return (
    <div className="filtros">
      <Select
        nome="mes"
        nomeParaSelect="selecione o mês"
        options={[
          'janeiro',
          'fevereiro',
          'março',
          'abril',
          'maio',
          'junho',
          'julho',
          'agosto',
          'setembro',
          'outubro',
          'novembro',
          'dezembro',
        ]}
        value={mes}
        setValue={setMes}
      />
      <span className="botaoDosFiltos">
        <button
          className="visualizador"
          style={{
            backgroundColor: '#F5831B',
            marginBottom: '7px',
            border: '1px solid #F5831B',
          }}
          onClick={filtrarPorMes}
        >
          <img src={filter} alt="filtrar" />
          filtrar
        </button>
        <button
          className="visualizador"
          style={{
            backgroundColor: '#F2F5FE',
            color: 'black',
            border: '1px solid',
            marginBottom: '7px',
          }}
          onClick={limparFiltro}
        >
          <img src={clear} alt="limpar" />
          limpar
        </button>
      </span>
    </div>
  );
}
export default MenuFiltro;
