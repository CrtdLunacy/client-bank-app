import { el, setChildren, mount } from 'redom';
import { getTimeFormat, getDateLongMonth } from '../modules/utility';
import { createChart } from '../components/charts';
import Choices from 'choices.js'

const cont = el('div.container');
const origin = window.location.origin;

const header = el('header.headerback', [
  el('div.container.header', [
    el('div.header__wrap.header__wrap-left', [
      el('h1.header__logo', 'Coin.')
    ]),
    el('div.header__wrap.header__wrap-right', [
      el('a.header__link', 'Банкоматы', { href: `${origin}?map` }),
      el('a.header__link.active', 'Счета', { href: `${origin}?account` }),
      el('a.header__link', 'Валюта', { href: `${origin}?currency` }),
      el('button.header__button', 'Выйти', { type: 'button'}),
    ])
  ])
]);

export function renderAccount(arr) {
  document.body.innerHTML = '';
  const topSide = el('div.account', [
    el('div.account__topwrap-left', [
      el('h3.account__name', 'Ваши счета'),
      el('select.account__select#account__select', { name: 'Сортировка' }, [
        el('option.account__option', 'Сортировка', { value: 'Сортировка', selected: true, disabled:true }),
        el('option.account__option', 'Номер счёта', { value: 'Номер счёта' }),
        el('option.account__option', 'Баланс', { value: 'Баланс' }),
        el('option.account__option', 'Время последней транзакции', { value: 'Время последней транзации' })
      ]),
    ]),
    el('button.account__button', 'Создать новый счет', { type: 'button' })
  ]);

  const accBody = el('div.account__body');
  const mainSide =  el('div.account__mainWrap');

  arr.forEach(element => {
    let bill = el('div.account__bill.bill__wrap', [
      el('div.bill__wrap-left', [
        el('h5.bill__number', `${element.account}`),
        el('div.bill__balance', `${element.balance} ₽`),
        el('div.bill__transaction', 'Последняя транзакция:'),
        el('span', `${(element.transactions.length > 0) ? getDateLongMonth(element.transactions[0].date) : 'Нет переводов'}`)
      ]),
      el('div.bill__wrap-right', [
        el('button.bill__button', 'Открыть'),
      ]),
    ]);
    mount(mainSide, bill);
  });
  setChildren(accBody, mainSide);
  setChildren(cont, [topSide, accBody]);
  setChildren(window.document.body, [header,cont]);

  const choices = new Choices('#account__select', {
    searchEnabled: false,
    removeItems: false,
    itemSelectText: '',
    position: 'bottom',
    renderChoiceLimit: 3,
  });
};

export function reRenderAccount(arr) {
  const accBody = document.querySelector('.account__body');
  const mainSide = document.querySelector('.account__mainWrap');
  mainSide.innerHTML = '';

  arr.forEach(element => {
    let bill = el('div.account__bill.bill__wrap', [
      el('div.bill__wrap-left', [
        el('h5.bill__number', `${element.account}`),
        el('div.bill__balance', `${element.balance} ₽`),
        el('div.bill__transaction', 'Последняя транзакция:'),
        el('span', `${(element.transactions.length > 0) ? getDateLongMonth(element.transactions[0].date) : 'Нет переводов'}`)
      ]),
      el('div.bill__wrap-right', [
        el('button.bill__button', 'Открыть'),
      ]),
    ]);
    mount(mainSide, bill);
  });

  setChildren(accBody, mainSide);
}

export function renderBill(obj) {
  document.body.innerHTML = '';
  const bill = el('div.billing.billing__wrap', [
    el('div.billing__header', [
      el('div.billing__header-left', [
        el('h5.billing__name', 'Просмотр счёта'),
        el('p.billing__number', `№ ${obj.account}`),
      ]),
      el('div.billing__header-right', [
        el('button.billing__button', 'Вернуться назад'),
        el('div.billing__balance', [
          el('p.billing__balance-text', `Баланс`),
          el('p.billing__balance-number', `${obj.balance} ₽`),
        ]),
      ]),
    ]),
    el('div.billing__body', [
      el('div.billing__send', [
        el('form.billing__form', [
          el('div.billing__form-title', 'Новый перевод'),
          el('label.billing__form-label.label__number', 'Номер счёта получателя', [
            el('input.billing__form-input.input__number', { type: 'number', placeholder: 'Введите номер', maxlength: '1226', required: true }),
          ]),
          el('div.billing__input-modal', [
            el('ul.billing__input-list')
          ]),
          el('label.billing__form-label.label__count', 'Сумма перевода', [
            el('input.billing__form-input.input__count', { type: 'number', placeholder: '0000', maxlength: '20', required: true }),
          ]),
          el('button.billing__form-btn', 'Отправить'),
        ]),
      ]),
      el('div.billing__dynamic', [
        el('p.billing__dynamic-title', 'Динамика баланса'),
        el('canvas.billing__dynamic-wrap#myChart', [
        ]),
      ]),
      el('div.billing__history', [
        el('p.billing__history-title'),
        el('div.billing__history-table.table', [
          el('div.table__title', 'История переводов'),
          el('div.table__head', [
            el('div.table__head-mark', 'Счёт отправителя'),
            el('div.table__head-mark', 'Счёт получателя'),
            el('div.table__head-mark', 'Сумма'),
            el('div.table__head-mark', 'Дата'),
          ]),
          el('div.table__body'),
        ]),
      ])
    ])
  ]);

  setChildren(cont, bill);
  setChildren(window.document.body, [header,cont]);

  const historyArray = obj.transactions.reverse().slice(0, 9);
  const table = document.querySelector('.table__body');
  historyArray.forEach(element => {
    let historyTable = el('div.table__body-row', [
      el('div.table__body-mark', `${element.from}`),
      el('div.table__body-mark', `${element.to}`),
      el(`${(element.from === obj.account)?'div.table__body-mark.mark-minus':'div.table__body-mark.mark-plus'}`, `${(element.from === obj.account) ? '-' + element.amount + '  ₽' : '+' + element.amount + '  ₽'}`),
      el('div.table__body-mark', `${getTimeFormat(element.date)}`),
    ]);
    mount(table, historyTable);
  })

  if(obj.transactions.length) getTimeFormat(obj.transactions[0].date);
  // GoogleCharts.load(drawVisualization);
  createChart(obj);
}





