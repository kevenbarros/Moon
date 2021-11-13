import React from "react"
import  "../styles/Input.scss"


function Input({label,place,type,name,value , onChange,error,onBlur}) {
  return (
    <div className='wrapper'>
      <label htmlFor={name} className='label'>{label}</label>
      <input  
      className='input'
      id={name}
      onChange={onChange}
      value={value}
      name={name} 
      placeholder={place}
      onBlur={onBlur} 
      type={type}/>
      {error && <p className='error'>{error}</p>}
    </div>
    )
}

export default Input;
