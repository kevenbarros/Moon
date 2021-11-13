import React from 'react';
export function useFiltro(mes) {
  if (mes == '') {
    mes = 'atual';
  }
  if (mes == 'janeiro') {
    mes = 0;
  }
  if (mes == 'fevereiro') {
    mes = 1;
  }
  if (mes == 'março') {
    mes = 2;
  }
  if (mes == 'abril') {
    mes = 3;
  }
  if (mes == 'maio') {
    mes = 4;
  }
  if (mes == 'junho') {
    mes = 5;
  }
  if (mes == 'julho') {
    mes = 6;
  }
  if (mes == 'agosto') {
    mes = 7;
  }
  if (mes == 'setembro') {
    mes = 8;
  }
  if (mes == 'outubro') {
    mes = 9;
  }
  if (mes == 'novembro') {
    mes = 10;
  }
  if (mes == 'dezembro') {
    mes = 11;
  }
  return mes;
}
