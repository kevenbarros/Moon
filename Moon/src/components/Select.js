import React from 'react';
import '../styles/select.scss';

const Select = ({
  nomeParaSelect,
  options,
  label,
  nome,
  value,
  setValue,
  ...props
}) => {
  return (
    <div className="wrapper">
      <label htmlFor={nome} className="label">
        {label}
      </label>
      <select
        className="select"
        id={nome}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        {...props}
      >
        <option value="" disabled>
          {nomeParaSelect}
        </option>
        {options.map((grupo) => (
          <option key={grupo} value={grupo}>
            {grupo}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
