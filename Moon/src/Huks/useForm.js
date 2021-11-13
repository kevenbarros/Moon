import React from 'react';
//regex de campos
const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha com email valido',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/,
    message: 'Mínimo de seis caracteres, pelo menos uma letra e um número',
  },
  number: {
    regex: /^\d+$/,
    message: 'apenas numeros',
  },
};

const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);
  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError('preencha um valor ');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }
  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
