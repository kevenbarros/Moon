import React from 'react';
import { useRoom } from '../../Huks/useRoom';

export function useGrafico2(RoomId) {
  //paramentros do grafico
  const [graficos2, setGraficos2] = React.useState([]);
  // valor do total de conta
  const [total2, setTotal2] = React.useState(0);

  const { renda, contasF } = useRoom(RoomId);

  const invertidoContasF = contasF.slice(0).reverse();

  React.useEffect(() => {
    invertidoContasF.map((item) => {
      //seta data para calc
      let dataConta = new Date(item.data);
      let dataFinal = new Date(item.dataFinal);
      let data = new Date();
      //verifica se é conta fixa
      if (item.grupo == 'conta Fixa') {
        let valor = parseFloat(item.valorParcelamento).toFixed(2);
        //adiciona ao valor total
        setTotal2((total2) => total2 + Number(valor));
        //setTotal2(total2 + Number(valor));
      }
      //verifica de é avista e está no mes que foi comprado
      if (
        item.dataFinal == 'avista' &&
        dataConta.getUTCMonth() == data.getUTCMonth() &&
        item.grupo != 'conta Fixa'
      ) {
        let valor = parseFloat(item.valorParcelamento).toFixed(2);
        //adiciona ao valor total
        setTotal2((total2) => total2 + Number(valor));
      }
      //verifica se é atual
      if (
        dataFinal.getFullYear() > data.getFullYear() ||
        (dataFinal.getUTCMonth() >= data.getUTCMonth() &&
          dataConta.getUTCMonth() <= data.getUTCMonth())
      ) {
        let valor = parseFloat(item.valorParcelamento).toFixed(2);

        setTotal2((total2) => total2 + Number(valor));
      }
    });
  }, [renda, contasF]);
  React.useEffect(() => {
    //joga em um array de objeto para exporta no formato que a biblioteca externa propoe
    const objGrupo = [
      {
        x: 'renda',
        y: Number(renda),
      },
      {
        x: 'conta',
        y: total2,
      },
    ];

    const arrayDeGrupos = [];
    arrayDeGrupos.push(objGrupo);
    setGraficos2(objGrupo);
  }, [total2, contasF, renda]);
  //exporta tudo no return
  return { graficos2, total2 };
}
