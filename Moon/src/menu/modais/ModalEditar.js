//react e hooks
import React from 'react';
import { useRoom } from '../../Huks/useRoom';
import { database } from '../../servese/firebase';
import useForm from '../../Huks/useForm';
import { useAuth } from '../../Huks/useAuth';

//scss
import '../../styles/ModalEditar.scss';
//imgs
import voltar from '../../assets/voltar.svg';
import salvar from '../../assets/salvar.svg';
//components
import Radios from '../../components/Radio';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
//biblioteca externa
import { DragSwitch } from 'react-dragswitch';
import 'react-dragswitch/dist/index.css';
import 'react-toggle/style.css';
import Toggle from 'react-toggle';
//popup de confirm
import PopUp from '../../popup/PopUp';
import PopUpError from '../../popup/PopUpError';

function ModalEditar({ setModal, id, RoomId, arrayConta }) {
  const { EntrarGoogle, user } = useAuth();
  //inputs e states que pode sem editaveis
  const valor = useForm();
  const nome = useForm();
  const entidade = useForm();
  const pagar = useForm();
  const dataInicio = useForm();
  const produto = useForm();
  const vezParcelamento = useForm(' ');
  const [checkedMes, setCheckedMes] = React.useState(arrayConta.pgDesseMes);
  const [newDatafinal, setNewDatafinal] = React.useState('');
  const [newValorparcelamento, setNewValorparcelamento] = React.useState(0);
  const [newContaObs, setNewContaObs] = React.useState('');
  const [parcelamento, setParcelamento] = React.useState(arrayConta.tipo);
  const [checked, setChecked] = React.useState(arrayConta.checkedPagamento);
  const [newGrupo, setNewGrupo] = React.useState(arrayConta.grupo);

  //popup
  const [popUp, setPopUp] = React.useState(false);
  const [popUpError, setPopUpError] = React.useState(false);

  //setando datas
  let data = new Date(dataInicio.value);
  let finalData = new Date(dataInicio.value);

  //funçoes de ativar popup
  async function ativarPopUp() {
    await setPopUp(true);
    setTimeout(() => {
      setPopUp(false);
      setModal(false);
    }, 1300);
  }
  async function ativarPopUpError() {
    await setPopUpError(true);
    setTimeout(() => {
      setPopUpError(false);
    }, 1300);
  }

  //função que volta para o MenuVisu
  async function handleOutSideClick(event) {
    //setando o Modal que vem do MenuVisu para fechar o modal
    setModal(false);

    if (event.target === event.currentTarget) {
      setModal(false);
    }
  }

  //função que envia para o banco os campos editados
  async function editarConta(e) {
    e.preventDefault();
    let data = new Date(arrayConta.data);
    let mes = new Date();
    if (valor.value === '') {
      return;
    }
    //verifica se a conta parcelada foi criada nesse mes e não estava programada para receber no mes que foi cadastrado
    if (
      arrayConta.pagarMesmoMes == false &&
      data.getUTCMonth() == mes.getUTCMonth() &&
      checkedMes == true
    ) {
      ativarPopUpError();
      return;
    }
    //caso a pessoa não esteja autenticada não permite, criar seta erro
    if (!user) {
      ativarPopUpError();
    }

    //cria o objero que irá para o banco
    const contasF = {
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
      pagar: pagar.value,
      tipo: parcelamento,
      checkedPagamento: checked,
      pagarMesmoMes: arrayConta.pagarMesmoMes,
      author: {
        nome: user.nome,
      },
      mesparcelado: arrayConta.mesparcelado,
    };
    // manda para o banco

    await database.ref(`sala/${RoomId}/conta/${id}`).update(contasF);
    //avisa que ocorreu tudo certo popup
    ativarPopUp();

    //fecha depois de editado
  }
  React.useEffect(() => {
    //não deixar por valor negativo
    if (Number(vezParcelamento.value) == -1) {
      vezParcelamento.setValue(0);
    }
    // seta a data final

    if (parcelamento == 'Pagamento parcelado') {
      if (data && vezParcelamento.value != NaN) {
        if (arrayConta.pagarMesmoMes == true) {
          setNewDatafinal(
            finalData.setMonth(
              data.getUTCMonth() + Number(vezParcelamento.value) - 1,
            ),
          );
        }
        if (arrayConta.pagarMesmoMes == false) {
          setNewDatafinal(
            finalData.setMonth(
              data.getUTCMonth() + Number(vezParcelamento.value),
            ),
          );
        }
      }
      // seta o valor da parcela
      setNewValorparcelamento(
        Number(valor.value) / Number(vezParcelamento.value),
      );
    }
    //quando for a vista
    if (parcelamento == 'Pagamento avista') {
      //seta a quantidade de parcelamento como (avista)
      vezParcelamento.setValue('avista');
      //seta a data final como (avista)
      setNewDatafinal('avista');
      //seta o valor do parcelamento
      setNewValorparcelamento(Number(valor.value) / 1);
    }

    arrayConta.mesparcelado.map((i) => {
      let datames = new Date(i.dataConta);
      let mes = new Date();
      //seta o pagamento do determinado mes fracionado
      if (datames.getUTCMonth() == mes.getUTCMonth()) {
        setCheckedMes(i.pg);
      }
    });
  }, [vezParcelamento.value, valor.value, parcelamento]);
  React.useEffect(() => {
    setNewContaObs(arrayConta.obs);
    entidade.setValue(arrayConta.entidade);
    nome.setValue(arrayConta.nome);
    valor.setValue(Number(arrayConta.contaF));
    produto.setValue(arrayConta.produto);
    dataInicio.setValue(arrayConta.data);
    pagar.setValue(arrayConta.pagar);
    vezParcelamento.setValue(arrayConta.parcelamento);
  }, []);
  React.useEffect(() => {
    arrayConta.mesparcelado.map((i) => {
      let datames = new Date(i.dataConta);
      let mes = new Date();
      //seta o fragimentação da conta parcelada
      if (datames.getUTCMonth() == mes.getUTCMonth()) {
        if (checkedMes != undefined) {
          i.pg = checkedMes;
          i.checkedPagamento = checkedMes;
        }
      }
    });
  }, [checkedMes, newDatafinal]);

  return (
    <div className="modal">
      {popUp && <PopUp texto="Conta editada com sucesso" />}
      {popUpError && (
        <PopUpError texto="só é possivel pagar essa conta no proximo mês" />
      )}
      <main>
        <aside>
          <button
            onClick={handleOutSideClick}
            style={{
              backgroundColor: '#fff',
              color: 'black',
              border: '1px solid',
            }}
          >
            {' '}
            <img src={voltar} alt="voltar" />
            voltar
          </button>
          <button onClick={editarConta}>
            {' '}
            <img src={salvar} alt="salvar" />
            salvar
          </button>
        </aside>
        <span>
          <p>Pagar </p> <p>Não pago </p>
          <Toggle
            defaultChecked={checkedMes}
            onChange={(toggleEvent) =>
              setCheckedMes(toggleEvent.target.checked)
            }
          />
          <p> Pago</p>
        </span>
        <span>
          <p>Empresa </p>{' '}
          <Input className="input" type="text" name="valor" {...entidade} />
        </span>
        <span>
          <p>Comprador</p>{' '}
          <Input className="input" type="text" name="comprador" {...nome} />
        </span>
        <span>
          <p>Valor </p>{' '}
          <Input
            className="input"
            placeholder="R$0.00"
            id="valor"
            type="text"
            {...valor}
          />
        </span>
        <span>
          <p>Produto </p>
          <Input className="input" type="text" name="produto" {...produto} />
        </span>
        <span>
          <p>Data da compra</p>
          <Input className="input" type="date" name="data" {...dataInicio} />
        </span>

        <span>
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
              </div>
            )}
            {parcelamento == 'Pagamento avista' && (
              <div className="inputRadio">
                <p>Não pago </p>
                <DragSwitch
                  checked={checked}
                  onChange={(e) => {
                    setChecked(e);
                  }}
                />
                <p> Pago</p>
              </div>
            )}
          </div>
        </span>
        <span>
          <p>Grupo </p>
          <Select
            nome="grupo"
            options={['lazer', 'roupas', 'alimento', 'conta Fixa', 'outros']}
            value={newGrupo}
            setValue={setNewGrupo}
          />
        </span>
        <span>
          <p>Observação</p>
        </span>
        <span>
          <h4>{id.obs}</h4>
          <div>
            <TextArea
              id="obs"
              label="Observação"
              value={newContaObs}
              setValue={setNewContaObs}
            />
          </div>
        </span>
      </main>
    </div>
  );
}

export default ModalEditar;
