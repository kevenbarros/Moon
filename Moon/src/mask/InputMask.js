import React, { InputHTMLAttributes, useCallback } from 'react';

import { cep, currency, cpf, valor, valor2 } from './mask';

const InputMask = ({ label, name, value, setValue, mask, ...props }) => {
  const handleKeyUp = useCallback(
    (e) => {
      if (mask === 'currency') {
        currency(e);
      }
      if (mask === 'cpf') {
        cpf(e);
      }

      if (mask === 'valor2') {
        valor2(e);
      }
    },
    [mask],
  );
  return (
    <div className="input-group prefix">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        {...props}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default InputMask;
