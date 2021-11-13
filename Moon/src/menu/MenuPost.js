import React from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../Huks/useAuth';
import { database } from '../servese/firebase';
import { useRoom } from '../Huks/useRoom';
//head
import Menu from '../components/Menu';

//componentes
import Radios from '../components/Radio';
import Select from '../components/Select';
import TextArea from '../components/TextArea';
import Input from '../components/Input';
import { DragSwitch } from 'react-dragswitch';

//scss
import '../styles/post.scss';
import 'react-dragswitch/dist/index.css';
//hooks
import useForm from '../Huks/useForm';
import PopUp from '../popup/PopUp';
import PopUpError from '../popup/PopUpError';
import useMedia from '../Huks/useMedia';

function Sala() {
  //mobile
  const mobile = useMedia('(max-width: 40rem)');
  //pegar chave
  const params = useParams();
  const RoomId = params.id;
  const { EntrarGoogle, user } = useAuth();
  //inputs do formulario
  const valor = useForm();
  const nome = useForm();
  const entidade = useForm();
  const dataInicio = useForm();
  const produto = useForm();
  const vezParcelamento = useForm();
  const [newContaObs, setNewContaObs] = React.useState('');
  const [newDatafinal, setNewDatafinal] = React.useState('');
  const [newValorparcelamento, setNewValorparcelamento] = React.useState(0);
  const [parcelamento, setParcelamento] = React.useState('avista');
  const [checked, setChecked] = React.useState(false);
  const [newGrupo, setNewGrupo] = React.useState('');
  const [pagarMesmoMes, setPagarMesmoMes] = React.useState(false);
  //popup
  const [popUp, setPopUp] = React.useState(false);
  const [popUpError, setPopUpError] = React.useState(false);

  //data para calculos
  const [data, setData] = React.useState();
  let finalData = new Date();
  const { renda, contasF } = useRoom(RoomId);

  //uso para fracionar a conta entre os meses
  let arraydemesparcelado = [];
  const [objetodemes, setObjetodemes] = React.useState();
  //teste stack

  //ativar popUp
  async function ativarPopUp() {
    await setPopUp(true);
    setTimeout(() => {
      setPopUp(false);
    }, 1300);
  }
  async function ativarPopUpError() {
    await setPopUpError(true);
    setTimeout(() => {
      setPopUpError(false);
    }, 1300);
  }

  //função que cria a conta no banco de dados realtime database firebase
  async function criarConta(e) {
    e.preventDefault();
    //verificar se tem algum desses campos vazio (.trim === ())
    if (
      valor.value.trim() === '' ||
      nome.value.trim() === '' ||
      entidade.value.trim() === '' ||
      dataInicio.value.trim() === '' ||
      produto.value.trim() === '' ||
      vezParcelamento.value.trim() === '' ||
      newGrupo.trim() === ''
    ) {
      return;
    }
    //verifica se a pessoa ta autenticada(logada)
    if (!user) {
      ativarPopUpError();
      return;
    }
    //objeto que vai para o banco
    const contaParaIrParaObanco = {
      contaF: valor.value,
      entidade: entidade.value,
      nome: nome.value,
      produto: produto.value,
      obs: newContaObs,
      data: dataInicio.value,
      grupo: newGrupo,
      dataFinal: newDatafinal,
      valorParcelamento: newValorparcelamento,
      parcelamento: vezParcelamento.value,
      tipo: parcelamento,
      pagar: 0,
      checkedPagamento: checked,
      pagarMesmoMes: pagarMesmoMes,
      author: {
        nome: user.nome,
      },
      mesparcelado: objetodemes,
    };
    //adicionando no banco
    await database.ref(`sala/${RoomId}/conta`).push(contaParaIrParaObanco);

    //chamando função de popup
    ativarPopUp();
    //resetando valores dos inputs do formulario
    setChecked(false);
    vezParcelamento.setValue('');
    produto.setValue('');
    dataInicio.setValue('');
    valor.setValue(0);
    entidade.setValue('');
    nome.setValue('');
    setNewGrupo('');
    setParcelamento('avista');
    setNewContaObs('');
    setNewValorparcelamento(0);

    //alert para avisar que a divida foi cadastrada
  }

  //useEffect
  React.useEffect(() => {
    //seta data inicio
    setData(new Date(dataInicio.value));

    //não deixa por valor negativo  no campo (parcelas)
    if (Number(vezParcelamento.value) == -1) {
      vezParcelamento.setValue('0');
    }
    // verifica se o valor do campo (parcelamento) é pagamento parcelado ou (avista)
    if (parcelamento == 'Pagamento parcelado') {
      //fazendo o calculo de data final para contas parceladas
      //dataFinal = data de hoje + numero de parcelas

      //data final que inclui o mes atual
      if (pagarMesmoMes) {
        setNewDatafinal(
          finalData.setMonth(
            data.getUTCMonth() + Number(vezParcelamento.value) - 1,
          ),
        );
      }
      // data final que não inclui mes atual
      if (pagarMesmoMes == false) {
        setNewDatafinal(
          finalData.setMonth(
            data.getUTCMonth() + Number(vezParcelamento.value),
          ),
        );
      }

      //calcula o valor de cada parcela
      //valor / parcelas
      setNewValorparcelamento(
        Number(valor.value) / Number(vezParcelamento.value),
      );

      //criar (mesparcelado) conta fracionada para outros meses
      //let contador começa em 0 para começar no mesmo mes
      // mesmo mes
      if (pagarMesmoMes) {
        for (let contador = 0; contador <= vezParcelamento.value; contador++) {
          //seta data inicial
          let dataConta = new Date(dataInicio.value);
          //mes inicial  = mes inicial + contador(1)
          dataConta.setMonth(dataConta.getUTCMonth() + contador);
          //cria um objeto com a informação de data mais contador
          let objdemes = {
            pg: false,
            dataConta: dataConta.toDateString(),
          };

          //spreed (talvez não seja necessario)
          let obj = { ...objdemes };
          //push do spreed no array
          arraydemesparcelado.push(obj);
        }
      }
      //let contador começa em 1 para pular o mes atual e começar só no mes seguinte
      //pagamento só no proximo mes
      if (pagarMesmoMes == false) {
        for (let contador = 1; contador <= vezParcelamento.value; contador++) {
          //seta data inicial
          let dataConta = new Date(dataInicio.value);
          //mes inicial  = mes inicial + contador(1)
          dataConta.setMonth(dataConta.getUTCMonth() + contador);
          //cria um objeto com a informação de data mais contador
          let objdemes = {
            pg: false,
            dataConta: dataConta.toDateString(),
          };

          //spreed (talvez não seja necessario)
          let obj = { ...objdemes };
          //push do spreed no array
          arraydemesparcelado.push(obj);
        }
      }
      //função que deixa cada objeto como destinto e com indice
      //ex: 0:{conta: 01/05/2021}, 1:{conta:01/06/2021}
      function arrayToObject(arr) {
        var obj = {};
        for (var i = 0; i < arr.length; ++i) {
          obj[i] = arr[i];
        }
        return obj;
      }
      //chama a função
      let objmes = arrayToObject(arraydemesparcelado);
      //poem o resutado no estado que vai para o banco
      setObjetodemes(objmes);
    }
    //pagagemento a vista
    if (parcelamento == 'Pagamento avista') {
      //seta quantidade Parcelamento como (avista)
      vezParcelamento.setValue('avista');
      //seta data final como (avista)
      setNewDatafinal('avista');
      //seta o valor de cada parcela ou seja o valor na integra já que é avista
      setNewValorparcelamento(Number(valor.value));

      //cria a distribuição (fraciona) de parcelas para o mes
      for (let contador = 0; contador < 1; contador++) {
        //seta data inicio
        let dataConta = new Date(dataInicio.value);
        //set mes = mes + contador(0)
        dataConta.setMonth(dataConta.getUTCMonth() + contador);

        //cria o objeto com a data de cada mes
        let objdemes = {
          pg: checked,
          dataConta: dataConta.toDateString(),
        };

        //spreed (talvez não seja necessario)
        let obj = { ...objdemes };

        //push do spreed no array
        arraydemesparcelado.push(obj);
      }
      //função que deixa cada objeto como destinto e com indice
      //ex: 0:{conta: 01/05/2021}
      function arrayToObject(arr) {
        var obj = {};
        for (var i = 0; i < arr.length; ++i) {
          obj[i] = arr[i];
        }
        return obj;
      }
      //chama a função
      let objmes = arrayToObject(arraydemesparcelado);
      //poem o resutado no estado que vai para o banco
      setObjetodemes(objmes);
    }
  }, [
    vezParcelamento.value,
    valor.value,
    parcelamento,
    checked,
    pagarMesmoMes,
  ]);

  return (
    <>
      {popUp && <PopUp texto="Conta cadastrada com sucesso" />}
      {popUpError && (
        <PopUpError texto="Error ao cadastrar, você não esta logado(a)" />
      )}
      {/*menu de navegação*/}
      <Menu />
      {/*div geral*/}
      <main className="page-auth">
        {/*bloco com animação*/}
        <form className={`formulario ${'grid'} ${'animeLeft'}`}>
          <Input
            className="input"
            label="Valor"
            type="number"
            name="valor"
            {...valor}
          />

          <Input
            className="input"
            label="Empresa"
            type="text"
            name="empresa"
            {...entidade}
          />

          <Input
            className="input"
            label="Data"
            type="date"
            name="data"
            {...dataInicio}
          />

          <Input
            className="input"
            label="Comprador"
            type="text"
            name="comprador"
            {...nome}
          />

          <Input
            className="input"
            label="Produto"
            type="text"
            name="produto"
            {...produto}
          />

          <Select
            label="Grupo"
            nome="grupo"
            nomeParaSelect="selecione o grupo"
            options={[
              'lazer',
              'roupas',
              'alimento',
              'conta Fixa',
              'outros',
              'eletrodoméstico',
            ]}
            value={newGrupo}
            setValue={setNewGrupo}
          />

          <div className="radio">
            <Radios
              options={['Pagamento avista', 'Pagamento parcelado']}
              value={parcelamento}
              setValue={setParcelamento}
            />

            {parcelamento == 'Pagamento parcelado' && (
              <div className="inputRadio">
                <Input
                  label="Quantas vezes?"
                  type="number"
                  name="vez"
                  {...vezParcelamento}
                />
                {/* improvisado  ----------------------------------------------------*/}
                <span>mesmo mes</span>

                <DragSwitch
                  checked={pagarMesmoMes}
                  onChange={(e) => {
                    setPagarMesmoMes(e);
                  }}
                />
              </div>
            )}
            {parcelamento == 'Pagamento avista' && (
              <div className="inputRadio">
                <span>Não pago </span>
                <DragSwitch
                  checked={checked}
                  onChange={(e) => {
                    setChecked(e);
                  }}
                />
                <span> Pago</span>
              </div>
            )}
          </div>
          <TextArea
            id="obs"
            label="Observação"
            value={newContaObs}
            setValue={setNewContaObs}
          />

          <div>
            <button onClick={criarConta} className="botao">
              Enviar
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Sala;
