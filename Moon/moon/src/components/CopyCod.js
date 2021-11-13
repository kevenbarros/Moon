import React from 'react';
import '../styles/copy.scss';
import copyImg from '../assets/copy.svg';
const CopyCod = (props) => {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }
  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Cpf : {props.code}</span>
    </button>
  );
};

export default CopyCod;
