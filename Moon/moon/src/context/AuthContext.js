import React from "react"
import { auth , firebase } from '../servese/firebase';
export const AuthContext = React.createContext({})
export function AuthContextProvider(props){

  
  const [user, setUser]= React.useState()

  React.useEffect(()=>{
    const desligar = auth.onAuthStateChanged(user => {
      if(user){
        const {displayName, photoURL, uid} = user
        if(!displayName || !photoURL){
          throw new Error('sem alguns dados')
        }
        setUser({
          id : uid,
          nome : displayName,
          foto : photoURL
        })
      
      }
    })

    return ()=>{
      desligar()
    }
  },[])
  async function EntrarGoogle(){
    const fornecedor =  new firebase.auth.GoogleAuthProvider()
    const resposta = await auth.signInWithPopup(fornecedor)
    if(resposta.user){
      const {displayName, photoURL, uid} = resposta.user
      console.log(displayName)
      console.log(photoURL)
      console.log(uid)
      
        if(!displayName || !photoURL){
          throw new Error('sem alguns dados')
        }
        setUser({
          id : uid,
          nome : displayName,
          foto : photoURL
        })
      }
     
    
  }

  return (
    <AuthContext.Provider value={{user,EntrarGoogle}}>
      {props.children}
    </AuthContext.Provider>
  )
}