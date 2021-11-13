//react e hooks
import React from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../Huks/useAuth';
import { useRoom } from '../Huks/useRoom';
import { database } from '../servese/firebase';
//scss
import '../styles/estatistica.scss';
import '../styles/sala.scss';
//imgs
import edit from '../assets/edit.svg';
import clear from '../assets/clear.svg';
//componentes
import Menu from '../components/Menu';

//componentes dos graficos
import { useGrafico } from './graficos/useGrafico';
import { useGrafico2 } from './graficos/useGraficoPizza2';
import { useGraficoTorre } from './graficos/useGraficoTorre';
//bibliotecas externa
import { VictoryPie, VictoryChart, VictoryBar } from 'victory';
import useMedia from '../Huks/useMedia';
import Input from '../components/Input';
import useForm from '../Huks/useForm';

function Sala() {
  //nova renda
  const newRenda = useForm('');
  const [estadoMudanca, setEstadoMudaca] = React.useState(false);
  //mobile
  const mobile = useMedia('(max-width: 40rem)');
  //react
  const params = useParams();
  const RoomId = params.id;
  const { EntrarGoogle, user } = useAuth();
  //hooks
  const { renda, contasF, cpfDb } = useRoom(RoomId);
  //componentes grafico pizza 1
  const {
    graficos,
    alimentoTotal,
    lazerTotal,
    outrosTotal,
    roupaTotal,
    contaFixaTotal,
    eletrodomésticoTotal,
    total,
  } = useGrafico(RoomId);
  //componentes grafico pizza 2
  const { graficos2, total2 } = useGrafico2(RoomId);

  //componentes grafico de torre
  const { graficoTorre } = useGraficoTorre(RoomId);

  //invertendo a conta que vem do banco
  const invertidoContasF = contasF.slice(0).reverse();
  function ativarMudancaDeRenda() {
    setEstadoMudaca(!estadoMudanca);
  }
  async function alterarRenda() {
    if (newRenda.value == null) return;
    if (Number(newRenda.value) <= 0) return;
    let trocaDeRenda = {
      renda: `${newRenda.value}`,
    };
    await database.ref(`sala/${RoomId}`).update(trocaDeRenda);
    setEstadoMudaca(!estadoMudanca);
  }

  return (
    <>
      <Menu />
      <main className="conteinerMain">
        <section className="flexGrafico">
          <div className="grid-div">
            <section className="aside-grafico">
              <VictoryPie
                colorScale={[
                  'tomato',
                  'orange',
                  'gold',
                  'cyan',
                  '#6a42ce',
                  'green',
                ]}
                data={graficos}
                innerRadius={75}
                style={{
                  data: {
                    fillOpacity: 0.9,
                    stroke: '#E7EBEF',
                    strokeWidth: 1,
                  },
                  labels: {
                    fontSize: 0,
                    fill: '#333',
                  },
                }}
              />
            </section>
            <section className="valores">
              <ul>
                <li className="alimento">alimento</li>
                <li className="lazer">lazer</li>
                <li className="outros">outros</li>
                <li className="roupas">vestimentas</li>

                <li className="contafixa">conta fixa</li>
                <li className="eletrodoméstico">
                  {mobile ? 'Eletro' : 'Eletrodoméstico'}
                </li>
              </ul>
              <ul className="listaDeValores">
                <li className="alimentoValores">
                  R$ {Number(alimentoTotal).toFixed(2)}
                </li>
                <li className="lazerValores">
                  R$ {Number(lazerTotal).toFixed(2)}
                </li>
                <li className="outrosValores">
                  R$ {Number(outrosTotal).toFixed(2)}
                </li>
                <li className="roupasValores">
                  R$ {Number(roupaTotal).toFixed(2)}
                </li>
                <li className="contafixaValores">
                  R$ {Number(contaFixaTotal).toFixed(2)}
                </li>
                <li className="eletrodomésticoValores">
                  R$ {Number(eletrodomésticoTotal).toFixed(2)}
                </li>
              </ul>
            </section>
          </div>

          <div className="grid-div">
            <section className="aside-grafico">
              <VictoryPie
                colorScale={['#50B77B', '#f35050']}
                data={graficos2}
                innerRadius={75}
                style={{
                  data: {
                    fillOpacity: 0.9,
                    stroke: '#E7EBEF',
                    strokeWidth: 1,
                  },
                  labels: {
                    fontSize: 0,
                    fill: '#333',
                  },
                }}
              />
            </section>
            <section className="conteinerGrafico2">
              <ul>
                <li className="rendaGrafico">
                  {!estadoMudanca ? (
                    `R$ ${Number(renda).toFixed(2)}`
                  ) : (
                    <>
                      <Input
                        label="nova renda"
                        placeholder={Number(renda).toFixed(2)}
                        type="number"
                        {...newRenda}
                      />
                      <button onClick={alterarRenda} className="botao">
                        enviar
                      </button>
                    </>
                  )}
                  {!estadoMudanca ? (
                    <img
                      src={edit}
                      onClick={ativarMudancaDeRenda}
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <img
                      src={clear}
                      onClick={ativarMudancaDeRenda}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </li>
                <span className="descricao">Sua renda</span>

                <li className="contaGrafico">R${total2.toFixed(2)}</li>
                <span className="descricao">Total de gastos do mês</span>

                <li
                  className={
                    Number(renda) - total2 <= (30 / 100) * Number(renda)
                      ? `restanteGrafico negativo`
                      : `restanteGrafico `
                  }
                >
                  R${(Number(renda) - total2).toFixed(2)}
                </li>
                <span className="descricao">Valor restante</span>
              </ul>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}

export default Sala;
