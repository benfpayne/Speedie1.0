import currency from 'currency.js';

export const formatMoney = (amount: number) => {
  return currency(amount, { precision: 0 }).format();
};
