import React from 'react';
export function useDate(date) {
  let data = new Date(date);
  let dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  return dataFormatada;
}
