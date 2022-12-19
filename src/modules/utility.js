import { authorization, getAccData } from "../API/Api";

//функция авторизации
export async function authorize() {
    const user = {
      login: document.querySelector('.form__input-login').value.replace(/\s/g, '').trim(),
      password: document.querySelector('.form__input-password').value.replace(/\s/g, '').trim(),
    };

    if(!user.login || !user.password) throw new SyntaxError('Данные некорректны')
    if(!user.login.match(/[a-zA-Z0-9]/)) throw new Error ('Логин должен состоять только из букв и цифр')

    const data = await authorization(user);
    document.cookie = `${encodeURIComponent('authToken')} = ${encodeURIComponent(data.payload.token)}`;
    const answ = await getAccData(data.payload.token);
    return answ;
};

//функция повторной авторизации
export async function reAuthorize(token) {
  const answ = await getAccData(token)
  return answ;
};

//функция получения суммы баланса 1 месяца
export function getMonthBalance(obj, number, bool) {
  const currDate = new Date(new Date().setDate(1));
  currDate.setMonth(currDate.getMonth() + 1 - number);
  const fullDate = currDate.valueOf();

  const numbersOne = obj.transactions.reduce((accumulator, currentValue) => {
    let elDate = new Date(currentValue.date).valueOf();
    let bill = currentValue.to;
    if(elDate <= fullDate && bill === obj.account) return accumulator + currentValue.amount;
    return accumulator;
  }, 0);

  const numbersTwo = obj.transactions.reduce((accumulator, currentValue) => {
    let elDate = new Date(currentValue.date).valueOf();
    let bill = currentValue.from;
    if(elDate <= fullDate && bill === obj.account) return accumulator + currentValue.amount;
    return accumulator;
  }, 0);
  let diff = (bool) ? numbersOne - numbersTwo : numbersTwo;

  return (diff < 0) ? 0 : diff;
}

//функция форматирования времени в формате дд.мм.гггг
export function getTimeFormat(string) {
  if(!string) return;
  const regex = /[-.:T]/;
  let arr = string.split(regex);
  [arr[0], arr[1], arr[2]] = [arr[2], arr[1], arr[0]];
  const timeString = `${arr[0]}.${arr[1]}.${arr[2]}`;
  return timeString;
}

//функция форматирования времени в формате дд месяц гггг
export function getDateLongMonth(string) {
  if(!string) return;
  const dateStr = new Date(string);
  let month = dateStr.toLocaleString('default', { month: 'long' });
  month = (month.slice(-1) === 'т') ? month + 'а' : month.slice(0, -1) + 'я';
  const timeString = `${dateStr.getDate()} ${month} ${dateStr.getFullYear()}`;
  return timeString;
}

//функция получения названия месяцев в формате "Февраль"
export function getMonths(num) {
  const date = new Date();
  const arr = [];
  for (let i = 0; i < num; ++i) {
    let newDate = new Date();
    newDate.setMonth(date.getMonth() - i);
    let newMonth = newDate.toLocaleString('default', { month: 'long' });
    arr.push(newMonth);
  }
  return arr;
}

//функция добавления счета для перевода в ЛС
export function addBillsToLocalStorage(key, transfBill) {
  if(!localStorage.getItem(key)) localStorage.setItem (key, JSON.stringify([transfBill]));
  else {
    let storageArray =  JSON.parse(localStorage.getItem(key));
    storageArray.push(transfBill);
    let newArray = [...new Set(storageArray)];
    localStorage.setItem (key, JSON.stringify(newArray));
  }
}
