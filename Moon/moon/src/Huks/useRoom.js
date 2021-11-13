import React from 'react';
import { database } from '../servese/firebase';
import { useAuth } from './useAuth';
export function useRoom(SalaID) {
  //puxa a Autenticação
  const { user } = useAuth();
  //puxa as contas do banco
  const [contasF, setContasF] = React.useState([]);
  //puxa a renda
  const [renda, setRenda] = React.useState('');
  const [cpfDb, setCpfDb] = React.useState('');

  React.useEffect(() => {
    //pega o caminho unico da pessoa
    const salaRef = database.ref(`sala/${SalaID}`);

    salaRef.on('value', (sala) => {
      const databaseSala = sala.val();

      const firebaseContaF = databaseSala.conta ?? {};
      const parsedContaF = Object.entries(firebaseContaF).map(
        ([key, value]) => {
          //retorna os parametros
          return {
            id: key,
            contaF: value.contaF,
            entidade: value.entidade,
            nome: value.nome,
            produto: value.produto,
            data: value.data,
            dataFinal: value.dataFinal,
            parcelamento: value.parcelamento,
            grupo: value.grupo,
            valorParcelamento: value.valorParcelamento,
            pagar: value.pagar,
            tipo: value.tipo,
            checkedPagamento: value.checkedPagamento,
            pagarMesmoMes: value.pagarMesmoMes,
            obs: value.obs,
            author: value.autor,
            mesparcelado: value.mesparcelado,
          };
        },
      );

      setRenda(databaseSala.renda);
      setCpfDb(databaseSala.cpf);
      setContasF(parsedContaF);
    });
    //desliga o evento salaref.on
    return () => {
      salaRef.off('value');
    };
  }, [SalaID, user?.id]);
  return { contasF, renda, cpfDb };
}
