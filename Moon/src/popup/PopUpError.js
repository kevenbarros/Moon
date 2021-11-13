import React from 'react'; //react

import '../styles/PopUp.scss'; //css

import imgConfirm from '../assets/error.svg';

function PopUpError({ texto }) {
  return (
    <div className="divFundo">
      <main>
        <center>
          <h2>{texto}</h2>
        </center>
        <center>
          <img src={imgConfirm} alt="error" />
        </center>
      </main>
    </div>
  );
}

export default PopUpError;
