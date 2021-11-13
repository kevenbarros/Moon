import React from 'react'; //react

import '../styles/PopUp.scss'; //css

import imgConfirm from '../assets/confirm.svg';

function PopUp({ texto }) {
  return (
    <div className="divFundo">
      <main>
        <center>
          <h2>{texto}</h2>
        </center>
        <center>
          <img src={imgConfirm} alt="confirm" />
        </center>
      </main>
    </div>
  );
}

export default PopUp;
