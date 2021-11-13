import React from 'react';

const InputPost = ({ id, label, value, setValue, ...props }) => {
  //props para espalhar toda funçao que tem o valor o mesmo da chave tipo requide ou value
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        {...props}
      />

      <br />
    </div>
  );
};

export default InputPost;
