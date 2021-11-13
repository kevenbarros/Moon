import React from 'react';
import { useRoom } from '../../Huks/useRoom';

export function useGraficoTorre(RoomId) {
  //tentar melhorar todo codigo :)

  const [graficoTorre, setGraficoTorre] = React.useState([]);
  const [total2, setTotal2] = React.useState(0);

  const { renda, contasF } = useRoom(RoomId);

  const invertidoContasF = contasF.slice(0).reverse();

  const [jan, setJan] = React.useState(0);
  const [fev, setFev] = React.useState(0);
  const [mar, setMar] = React.useState(0);
  const [abr, setAbr] = React.useState(0);
  const [mai, setMai] = React.useState(0);
  const [jun, setJun] = React.useState(0);
  const [jul, setJul] = React.useState(0);
  const [ago, setAgo] = React.useState(0);
  const [set, setSet] = React.useState(0);
  const [out, setOut] = React.useState(0);
  const [nov, setNov] = React.useState(0);
  const [dez, setDez] = React.useState(0);

  React.useEffect(() => {
    invertidoContasF.map((item) => {
      let dataConta = new Date(item.data);
      let dataFinal = new Date(item.dataFinal);
      let data = new Date();

      if (item.tipo == 'Pagamento parcelado') {
        if (dataFinal.getUTCFullYear() > dataConta.getUTCFullYear()) {
          let parcel = Number(item.parcelamento);
          let r = 0;
          for (
            let u = dataConta.getUTCMonth();
            u + parcel >= dataFinal.getUTCMonth();
            u = u + 1
          ) {
            r = r + 1;
            if (u > 11) {
              u = 0;
              parcel = parcel - r;
            }

            switch (u) {
              case 0:
                setJan(jan + Number(item.valorParcelamento));
                break;
              case 1:
                setFev(fev + Number(item.valorParcelamento));

                break;
              case 2:
                setMar(mar + Number(item.valorParcelamento));

                break;
              case 3:
                setAbr(abr + Number(item.valorParcelamento));

                break;
              case 4:
                setMai(mai + Number(item.valorParcelamento));

                break;
              case 5:
                setJun(jun + Number(item.valorParcelamento));

                break;
              case 6:
                setJul(jul + Number(item.valorParcelamento));

                break;
              case 7:
                setAgo(ago + Number(item.valorParcelamento));

                break;
              case 8:
                setSet(set + Number(item.valorParcelamento));

                break;
              case 9:
                setOut(out + Number(item.valorParcelamento));

                break;
              case 10:
                setNov(nov + Number(item.valorParcelamento));

                break;
              case 11:
                setDez(dez + Number(item.valorParcelamento));

                break;
            }
          }
        }

        for (
          let contador = dataConta.getUTCMonth();
          contador + Number(item.parcelamento) >= dataFinal.getUTCMonth() &&
          contador + Number(item.parcelamento) <=
            dataFinal.getUTCMonth() + Number(item.parcelamento);
          contador = contador + 1
        ) {
          switch (dataConta.getUTCMonth()) {
            case 0:
              setJan(jan + Number(item.valorParcelamento));
              break;
            case 1:
              setFev(fev + Number(item.valorParcelamento));

              break;
            case 2:
              setMar(mar + Number(item.valorParcelamento));

              break;
            case 3:
              setAbr(abr + Number(item.valorParcelamento));

              break;
            case 4:
              setMai(mai + Number(item.valorParcelamento));

              break;
            case 5:
              setJun(jun + Number(item.valorParcelamento));

              break;
            case 6:
              setJul(jul + Number(item.valorParcelamento));

              break;
            case 7:
              setAgo(ago + Number(item.valorParcelamento));

              break;
            case 8:
              setSet(set + Number(item.valorParcelamento));

              break;
            case 9:
              setOut(out + Number(item.valorParcelamento));

              break;
            case 10:
              setNov(nov + Number(item.valorParcelamento));

              break;
            case 11:
              setDez(dez + Number(item.valorParcelamento));

              break;
          }
        }
      }
    });
  }, [renda, contasF]);
  React.useEffect(() => {
    const objGrupo = [
      {
        x: 'jan',
        y: jan,
      },
      {
        x: 'fev',
        y: fev,
      },
      {
        x: 'mar',
        y: mar,
      },
      {
        x: 'abr',
        y: abr,
      },
      {
        x: 'mai',
        y: mai,
      },
      {
        x: 'jun',
        y: jun,
      },
      {
        x: 'jul',
        y: jul,
      },
      {
        x: 'ago',
        y: ago,
      },
      {
        x: 'set',
        y: set,
      },
      {
        x: 'out',
        y: out,
      },
      {
        x: 'nov',
        y: nov,
      },
      {
        x: 'dez',
        y: dez,
      },
    ];

    setGraficoTorre(objGrupo);
  }, [jan, fev, dez]);

  return { graficoTorre };
}
