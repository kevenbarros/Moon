const TestedeMask = ({ ...props }) => {
  function id(el) {
    return document.getElementById(el);
  }
  window.onload = function () {
    id('peso').onkeyup = function () {
      var v = this.value,
        integer = v.split(',')[0];

      v = v.replace(/\D/, '');
      v = v.replace(/^[0]+/, '');

      if (v.length <= 4 || !integer) {
        if (v.length === 1) v = '0,000' + v;
        if (v.length === 2) v = '0,00' + v;
        if (v.length === 3) v = '0,0' + v;
        if (v.length === 4) v = '0,' + v;
      } else {
        v = v.replace(/^(\d{1,})(\d{4})$/, '$1,$2');
      }

      this.value = v;
    };
  };

  return <input type="text" name="peso" id="peso" maxlength="8" {...props} />;
};
export default TestedeMask;
