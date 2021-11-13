import React from 'react'
import { useParams } from 'react-router';
import { useAuth } from '../Huks/useAuth';
import '../styles/visu.scss';
import '../styles/sala.scss'
import { useRoom } from '../Huks/useRoom';

//imgs


import Menu from '../components/Menu';


function Sala() {
  const params = useParams();
  const RoomId = params.id;
  const {EntrarGoogle,user}= useAuth()
  const { renda, contasF } = useRoom(RoomId);
  
  const invertidoContasF = contasF.slice(0).reverse() 
  
 
  const [rendaLocal, setRendaLocal] = React.useState(0)
  const arrayConta = []
  invertidoContasF.map((i)=>{
     const u = parseFloat(i.contaF)
    arrayConta.push(u)
  })
  
  

  React.useEffect(()=>{
    async function setrenda(){
      let rendaNumber = await parseInt(renda)
      for(let p =0 ;p < arrayConta.length;p++){
        rendaNumber= rendaNumber - arrayConta[p]
      }
      await setRendaLocal(rendaNumber)
      
    }
     
    setrenda()
  },[renda,contasF])

  return (
   <div id='page-room'>
    <Menu/>
    <section className='seção'>
      <div className="renda-table">
        <span className='renda'>
          <h1> sua renda {rendaLocal}</h1>
        </span>
        <div>
        <table className='tabela' border="0" >
              <thead>
                <tr>
                    <th> Data </th>
                    <th> empresa </th>
                    <th> Nome </th>
                    <th> Produto </th>
                    <th> valor </th>
                    <th> Excluir </th>
                </tr>
              </thead>
              <tbody>
          {invertidoContasF.map((i,index)=>{
            
            
            
            
          return(
              <tr key={index}>
                <td>{i.data}</td>
                <td>{i.entidade}</td>
                <td>{i.nome}</td>
                <td>{i.produto}</td>
                <td>{i.contaF}</td>
                
                <td><button>excluir</button></td>
              </tr>
          )
        })}
        </tbody>
        </table>
        </div>
        </div>
      </section>

      

   </div>
);
};
  

export default Sala;