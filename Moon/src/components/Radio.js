import React from 'react';


const Radios = ({ options, value, setValue, ...props }) => {
  return (
    <div>
      {options.map((op) => (
        <label key={op} >
         
          <input
            style={{marginBottom:'15px'}}
            type="radio"
            value={op}
            checked={value === op}
            onChange={({ target }) => setValue(target.value)}
            {...props}
          /> {op}
          <br />
        </label>
      ))}
    </div>
  );
};

export default Radios;