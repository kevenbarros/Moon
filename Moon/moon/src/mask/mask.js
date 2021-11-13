export function currency(e) {
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

  e.currentTarget.value = value;
  return e;
}
export function cpf(e) {
  e.currentTarget.maxLength = 14;
  let value = e.currentTarget.value;
  if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
    value = value.replace(/\D/g, '');

    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');

    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.currentTarget.value = value;
  }

  return e;
}

export function valor2(e) {
  let v = e.currentTarget.value,
    integer = v.split(',')[0];

  v = v.replace(/\D/g, '');
  v = v.replace(/^[0]+/, '');

  if (v.length <= 2 || !integer) {
    if (v.length === 1) v = '0,0' + v;
    if (v.length === 2) v = '0,' + v;
    // if (v.length === 3) v = '0,0' + v;
    //if (v.length === 4) v = '0,' + v;
  } else {
    v = v.replace(/^(\d{1,})(\d{2})$/, '$1,$2');
  }

  e.currentTarget.value = v;
  return e;
}
