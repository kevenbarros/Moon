import React from 'react';
import Select from '../components/Select';
import { useRoom } from './useRoom';

const Filtro = ({ filtro, setFiltro, RoomId, setArray, array }) => {
  const [mes, setMes] = React.useState('');
  const { renda, contasF } = useRoom(RoomId);
  const invertidoContasF = contasF.slice(0).reverse();

  function buscarPorMes(evt) {
    evt.preventDefault();
    array.splice(0, array.length);
    if (mes == 'janeiro') {
      invertidoContasF.map((C) => {
        let data = new Date(C.data);
        if (data.getMonth() == 0) {
          setArray((array) => [...array, C]);
          setFiltro(true);
        }
      });
    }
    if (mes == 'fevereiro') {
      invertidoContasF.map((C) => {
        let data = new Date(C.data);
        if (data.getMonth() == 1) {
          setArray((array) => [...array, C]);
          setFiltro(true);
        }
      });
    }
    if (mes == 'março') {
      invertidoContasF.map((C) => {
        let data = new Date(C.data);
        if (data.getMonth() == 2) {
          setArray((array) => [...array, C]);
          setFiltro(true);
        }
      });
    }
    if (mes == 'abril') {
      invertidoContasF.map((C) => {
        let data = new Date(C.data);
        if (data.getMonth() == 3) {
          setArray((array) => [...array, C]);
          setFiltro(true);
        }
      });
    }
    if (mes == 'maio') {
      invertidoContasF.map((C) => {
        let data = new Date(C.data);
        if (data.getMonth() == 4) {
          setArray((array) => [...array, C]);
          setFiltro(true);
        }
      });
    }
    if (mes == 'junho') {
      invertidoContasF.map((C) => {
        let data = new Date(C.data);
        if (data.getMonth() == 5) {
          setArray((array) => [...array, C]);
          setFiltro(true);
        }
      });
    }
    if (mes == 'julho') {
      invertidoContasF.map((C) => {
        let data = new Date(C.data);
        if (data.getMonth() == 6) {
          setArray((array) => [...array, C]);
          setFiltro(true);
        }
      });
    }
    if (mes == 'agosto') {
      invertidoContasF.map((C) => {
        let data = new Date(C.data);
        if (data.getMonth() == 7) {
          setArray((array) => [...array, C]);
          setFiltro(true);
        }
      });
    }
    if (mes == 'setembro') {
      invertidoContasF.map((C) => {
        let data = new Date(C.data);
        if (data.getMonth() == 8) {
          setArray((array) => [...array, C]);
          setFiltro(true);
        }
      });
    }
    if (mes == 'outubro') {
      invertidoContasF.map((C) => {
        let data = new Date(C.data);
        if (data.getMonth() == 9) {
          setArray((array) => [...array, C]);
          setFiltro(true);
        }
      });
    }
    if (mes == 'novembro') {
      invertidoContasF.map((C) => {
        let data = new Date(C.data);
        if (data.getMonth() == 10) {
          setArray((array) => [...array, C]);
          setFiltro(true);
        }
      });
    }
    if (mes == 'dezembro') {
      invertidoContasF.map((C) => {
        let data = new Date(C.data);
        if (data.getMonth() == 11) {
          setArray((array) => [...array, C]);
          setFiltro(true);
        }
      });
    }
    if (mes == 'todos') {
      invertidoContasF.map((C) => {
        setArray((array) => [...array, C]);
        setFiltro(true);
      });
    }
    console.log(array.length);
  }
  return (
    <form className="buscaData">
      {' '}
      <Select
        label="Grupo"
        nome="grupo"
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
          'todos',
        ]}
        value={mes}
        setValue={setMes}
      />
      <button onClick={buscarPorMes}>Buscar</button>
    </form>
  );
};

export default Filtro;
