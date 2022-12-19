import { el, setChildren, mount } from 'redom';
import { createChartBalance, createChartTransactions } from '../components/charts';
import { getTimeFormat } from '/src/modules/utility';
import 'intersection-observer';

const cont = el('div.container');
const origin = window.location.origin;

export function renderDetailAcc(obj) {
  const accBody = document.querySelector('.billing__body');
  accBody.innerHTML = '';

  const detailsWrap = el('div.details', [
    el('div.details__dynamic-wrap', [
      el('h5.details__dynamic-title', 'Динамика баланса'),
      el('canvas#details__dynamic')
    ]),
    el('div.details__transactions-wrap', [
      el('h5.details__transactions-title', 'Динамика транзакций'),
      el('canvas#details__transactions')
    ]),
    el('div.details__history-wrap', [
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
        el('div.table__pagination')
      ]),
    ])
  ])

  setChildren(accBody, detailsWrap);

  const historyArray = obj.transactions.reverse().slice(0, 25);
  const table = document.querySelector('.table__body');
  historyArray.forEach(element => {
    let historyTable = el('div.table__body-row', [
      el('div.table__body-mark', `${element.from}`),
      el('div.table__body-mark', `${element.to}`),
      el(`${(element.from === obj.account)?'div.table__body-mark.mark-minus':'div.table__body-mark.mark-plus'}`, `${(element.from === obj.account) ? '-' + element.amount : '+' + element.amount}`),
      el('div.table__body-mark', `${getTimeFormat(element.date)}`),
    ]);
    mount(table, historyTable);
  })

  // getTimeFormat(obj.transactions[0].date);


  createChartBalance(obj);
  createChartTransactions(obj);
  renderPagination(20, '.table__pagination','table__pagination-item', obj.transactions)
}

export function reRenderDetailAcc(obj) {
  document.body.innerHTML = '';

  const header = el('header.header', [
    el('div.header__wrap.header__wrap-left', [
      el('h1.header__logo', 'Coin.')
    ]),
    el('div.header__wrap.header__wrap-right', [
      el('a.header__link', 'Банкоматы', { href: `${origin}?map` }),
      el('a.header__link.active', 'Счета', { href: `${origin}?account` }),
      el('a.header__link', 'Валюта', { href: `${origin}?currency` }),
      el('button.header__button', 'Выйти', { type: 'button'}),
    ])
  ]);

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
      el('div.details', [
        el('div.details__dynamic-wrap', [
          el('h5.details__dynamic-title', 'Динамика баланса'),
          el('canvas#details__dynamic')
        ]),
        el('div.details__transactions-wrap', [
          el('h5.details__transactions-title', 'Динамика транзакций'),
          el('canvas#details__transactions')
        ]),
        el('div.details__history-wrap', [
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
            el('div.table__pagination')
          ]),
        ])
      ])
    ])
  ]);

  setChildren(cont, bill);
  setChildren(window.document.body, [header,cont]);

  const historyArray = obj.transactions.reverse().slice(0, 25);

  const table = document.querySelector('.table__body');
  historyArray.forEach(element => {
    let historyTable = el('div.table__body-row', [
      el('div.table__body-mark', `${element.from}`),
      el('div.table__body-mark', `${element.to}`),
      el(`${(element.from === obj.account)?'div.table__body-mark.mark-minus':'div.table__body-mark.mark-plus'}`, `${(element.from === obj.account) ? '-' + element.amount : '+' + element.amount}`),
      el('div.table__body-mark', `${getTimeFormat(element.date)}`),
    ]);
    mount(table, historyTable);
  })

  createChartBalance(obj);
  createChartTransactions(obj);
  renderPagination(20, '.table__pagination','table__pagination-item', obj.transactions);
}

export function renderPagination(count, parent, item, array) {
  const tablePagination =  document.querySelector(parent);
  const fullArrayTrans = array.reverse();
  const pagination = Math.ceil(fullArrayTrans.length / 25);
  if(pagination < count){
    for(let i = 1; i <= pagination; i++) {
      const paginationItem = el(`div.${item}`, `${i}`)
      mount(tablePagination, paginationItem);
    }
  }else {
    for(let i = 1; i <= pagination; i++) {
      if(i<20) {
        const paginationItem = el(`div.${item}`, `${i}`)
        mount(tablePagination, paginationItem);
      }
      if(i === pagination) {
        const paginationItem = el(`div.${item}`, `${i}`)
        mount(tablePagination, paginationItem);
      }
    }
    const paginationPings = el(`div.${item}`, `...`)
    mount(tablePagination, paginationPings, tablePagination.lastChild);
  }

}
