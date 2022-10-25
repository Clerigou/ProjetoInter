export const MaskCPF = v => {
  v = v.replace(/\D/g, '');

  if (v.length <= 11) {
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    v = v.replace(/^(\d{2})(\d)/, '$1.$2');
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
    v = v.replace(/(\d{4})(\d)/, '$1-$2');
  }

  return v;
};

export const CellPhoneMask = v => {
  v = v.replace(/\D/g, '');
  v = v.replace(/(^\d{2})(\d)/, '($1) $2');
  v = v.replace(/(\d{4,5})(\d{4}$)/, '$1-$2');

  return v;
};

export const CEPMask = v => {
  v = v.replace(/(\d{5})(\d{3})/, '$1-$2');

  return v;
};
