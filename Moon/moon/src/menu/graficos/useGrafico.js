import React from 'react';
import { useRoom } from '../../Huks/useRoom';

export function useGrafico(RoomId) {
  //stados que farão parte do garfico
  const [graficos, setGraficos] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [alimentoTotal, setAlimentoTotal] = React.useState();
  const [lazerTotal, setLazerTotal] = React.useState();
  const [outrosTotal, setOutrosTotal] = React.useState();
  const [roupaTotal, setRoupaTotal] = React.useState();
  const [eletrodomésticoTotal, setEletrodomésticoTotal] = React.useState();
  const [contaFixaTotal, setContaFixaTotal] = React.useState();

  //hook de renda
  const { renda, contasF } = useRoom(RoomId);

  //inverter a conta
  const invertidoContasF = contasF.slice(0).reverse();

  React.useEffect(() => {
    invertidoContasF.map((item) => {
      //set de datas para calc
      let dataConta = new Date(item.data);
      let dataFinal = new Date(item.dataFinal);
      let data = new Date();

      //verifica se é conta fixa
      if (item.dataFinal == 'avista' && item.grupo == 'conta Fixa') {
        let valor = parseFloat(item.valorParcelamento).toFixed(2);
        setTotal((total) => total + Number(valor));
      }
      //verifica se a conta é avista e foi feita no mesmo mes
      if (
        item.dataFinal == 'avista' &&
        dataConta.getUTCMonth() == data.getMonth() &&
        item.grupo != 'conta Fixa'
      ) {
        let valor = parseFloat(item.valorParcelamento).toFixed(2);
        setTotal((total) => total + Number(valor));
      }
      //verifica se a conta é atual
      if (
        dataFinal.getFullYear() > data.getFullYear() ||
        (dataFinal.getUTCMonth() >= data.getUTCMonth() &&
          dataConta.getUTCMonth() <= data.getMonth())
      ) {
        let valor = parseFloat(item.valorParcelamento).toFixed(2);
        setTotal((total) => total + Number(valor));
      } else {
        return;
      }
    });

    //inicia variaveis para contador
    let alimento = 0;
    let outros = 0;
    let lazer = 0;
    let roupas = 0;
    let contaFixa = 0;
    let eletrodoméstico = 0;
    invertidoContasF.map((i) => {
      //seta datas especificas de cada (i)
      let dataConta = new Date(i.data);
      let dataFinal = new Date(i.dataFinal);
      let data = new Date();
      //verifica o grupo da conta
      if (i.grupo == 'alimento') {
        if (
          i.dataFinal == 'avista' &&
          dataConta.getUTCMonth() == data.getUTCMonth()
        ) {
          let valor = parseFloat(i.valorParcelamento);
          alimento = alimento + Number(valor.toFixed(2));

          return {
            x: i.grupo,
            y: alimento,
          };
        }
        if (
          dataFinal.getFullYear() > data.getFullYear() ||
          (dataFinal.getMonth() >= data.getMonth() &&
            dataConta.getUTCMonth() <= data.getMonth())
        ) {
          let valor = parseFloat(i.valorParcelamento);
          alimento = alimento + Number(valor.toFixed(2));

          return {
            x: i.grupo,
            y: alimento,
          };
        }
      }

      if (i.grupo == 'outros') {
        if (
          i.dataFinal == 'avista' &&
          dataConta.getUTCMonth() == data.getMonth()
        ) {
          let valor = parseFloat(i.valorParcelamento);
          outros = outros + Number(valor.toFixed(2));

          return {
            x: i.grupo,
            y: outros,
          };
        }
        if (
          dataFinal.getFullYear() > data.getFullYear() ||
          (dataFinal.getMonth() >= data.getMonth() &&
            dataConta.getUTCMonth() <= data.getMonth())
        ) {
          let valor = parseFloat(i.valorParcelamento);
          outros = outros + Number(valor.toFixed(2));

          return {
            x: i.grupo,
            y: outros,
          };
        }
      }
      if (i.grupo == 'lazer') {
        if (
          i.dataFinal == 'avista' &&
          dataConta.getUTCMonth() == data.getMonth()
        ) {
          let valor = parseFloat(i.valorParcelamento);
          lazer = lazer + Number(valor.toFixed(2));

          return {
            x: i.grupo,
            y: lazer,
          };
        }
        if (
          dataFinal.getFullYear() > data.getFullYear() ||
          (dataFinal.getMonth() >= data.getMonth() &&
            dataConta.getUTCMonth() <= data.getMonth())
        ) {
          let valor = parseFloat(i.valorParcelamento);
          lazer = lazer + Number(valor.toFixed(2));
          return {
            x: i.grupo,
            y: lazer,
          };
        }
      }
      if (i.grupo == 'roupas') {
        if (
          i.dataFinal == 'avista' &&
          dataConta.getUTCMonth() == data.getMonth()
        ) {
          let valor = parseFloat(i.valorParcelamento);
          roupas = roupas + Number(valor.toFixed(2));

          return {
            x: i.grupo,
            y: roupas,
          };
        }
        if (
          dataFinal.getFullYear() > data.getFullYear() ||
          (dataFinal.getMonth() >= data.getMonth() &&
            dataConta.getUTCMonth() <= data.getMonth())
        ) {
          let valor = parseFloat(i.valorParcelamento);
          roupas = roupas + Number(valor.toFixed(2));
          return {
            x: i.grupo,
            y: roupas,
          };
        }
      }
      if (i.grupo == 'eletrodoméstico') {
        if (
          i.dataFinal == 'avista' &&
          dataConta.getUTCMonth() == data.getMonth()
        ) {
          let valor = parseFloat(i.valorParcelamento);
          eletrodoméstico = eletrodoméstico + Number(valor.toFixed(2));

          return {
            x: i.grupo,
            y: eletrodoméstico,
          };
        }
        if (
          dataFinal.getFullYear() > data.getFullYear() ||
          (dataFinal.getMonth() >= data.getMonth() &&
            dataConta.getUTCMonth() <= data.getMonth())
        ) {
          let valor = parseFloat(i.valorParcelamento);
          eletrodoméstico = eletrodoméstico + Number(valor.toFixed(2));
          return {
            x: i.grupo,
            y: eletrodoméstico,
          };
        }
      }

      if (i.grupo == 'conta Fixa') {
        if (
          i.dataFinal == 'avista' &&
          dataConta.getUTCMonth() == data.getMonth()
        ) {
          let valor = parseFloat(i.valorParcelamento);
          contaFixa = contaFixa + Number(valor.toFixed(2));

          return {
            x: i.grupo,
            y: contaFixa,
          };
        }
        if (
          dataFinal.getFullYear() > data.getFullYear() ||
          (dataFinal.getMonth() >= data.getMonth() &&
            dataConta.getUTCMonth() <= data.getMonth())
        ) {
          let valor = parseFloat(i.valorParcelamento);
          contaFixa = contaFixa + Number(valor.toFixed(2));
          return {
            x: i.grupo,
            y: contaFixa,
          };
        }
      }
    });
    // poem em um objeto cada contador setado acima
    const objGrupo = [
      {
        x: 'alimento',
        y: alimento,
      },
      {
        x: 'lazer',
        y: lazer,
      },
      {
        x: 'outros',
        y: outros,
      },
      {
        x: 'roupas',
        y: roupas,
      },
      {
        X: 'eletrodoméstico',
        Y: eletrodoméstico,
      },
      {
        x: 'conta Fixa',
        y: contaFixa,
      },
    ];
    //prepara o set para exportar
    const arrayDeGrupos = [];
    arrayDeGrupos.push(objGrupo);
    setAlimentoTotal(alimento);
    setLazerTotal(lazer);
    setOutrosTotal(outros);
    setRoupaTotal(roupas);
    setContaFixaTotal(contaFixa);
    setEletrodomésticoTotal(eletrodoméstico);
    setGraficos(arrayDeGrupos[0]);
  }, [renda, contasF]);
  //exporta tudo
  return {
    graficos,
    alimentoTotal,
    lazerTotal,
    outrosTotal,
    roupaTotal,
    contaFixaTotal,
    eletrodomésticoTotal,
    total,
  };
}
