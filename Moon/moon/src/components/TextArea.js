import React from 'react';
import '../styles/textArea.scss'
const TextArea = ({ id, label, value, setValue, ...props }) => {
  //propis para espalhar toda funçao que tem o valor o mesmo da chave tipo requide ou value
  return (
    <div className='wrapper'>
      <label htmlFor={id} className='label'>{label}</label><br />
      <textarea
        className='textArea'
        rows="4" cols="74" 
        id={id}
        name={id}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        {...props}
      ></textarea>
    </div>
  );
};

export default TextArea;