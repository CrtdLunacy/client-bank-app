const {
  getAccData,
  authorization,
  createAcc,
  transfMoney,
  openBill,
  getAllCrypto,
  getAccountCrypto,
  exchangeCurr,
  getBanksPosition
} = require("../API/Api");


const user = {
  login: 'developer',
  password: 'skillbox'
}

const wrongUser = {
  login: 'wawad',
  password: 'skillbox'
}


test('Авторизация', async() => {
  const data = await authorization(user);
  expect(data.payload).toBe('ZGV2ZWxvcGVyOnNraWxsYm94');
});

// test('Получение данных аккаунта', () => {
//   expect(validationCardNum('4221-2342-4321-1234')).toBe(true);
// });
// getAccData

// createAcc
// transfMoney
// openBill
// getAllCrypto
// getAccountCrypto
// exchangeCurr
// getBanksPosition
