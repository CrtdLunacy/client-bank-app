import { el, setChildren, mount, unmount } from 'redom';
import { getAllCrypto, getAccountCrypto } from "../API/Api";
import { loader } from "../components/loading";
import Choices from 'choices.js'

const cont = el('div.container');
const origin = window.location.origin;
const classLoadArray = [
                        '.currlist__list',
                        '.livelist-list'
                      ];

const header = el('header.headerback', [
  el('div.container.header', [
    el('div.header__wrap.header__wrap-left', [
      el('h1.header__logo', 'Coin.')
    ]),
    el('div.header__wrap.header__wrap-right', [
      el('a.header__link', 'Банкоматы', { href: `${origin}?map` }),
      el('a.header__link', 'Счета', { href: `${origin}?account` }),
      el('a.header__link.active', 'Валюта', { href: `${origin}?currency` }),
      el('button.header__button', 'Выйти', { type: 'button'}),
    ])
  ])
]);

export async function renderCurrents() {
  document.body.innerHTML = '';
  const title = el('h2.current__title', 'Валютный обмен');
  const bodyCurr = el('div.current__wrap', [
    el('div.current__wrap-left', [
      el('div.currlist', [
        el('h3.currlist__title', 'Ваши валюты'),
        el('div.currlist__list')
      ]),
      el('div.exchange', [
        el('h3.exchange__title', 'Обмен валюты'),
        el('form.exchange__form', [
          el('div.exchange__form-left', [
            el('div.select__wrap-top', [
              el('p.exchange__form-text', 'Из'),
              el('select.exchange__form-select.from__select', { name: 'Валюта' }, [
              ]),
              el('p.exchange__form-text', 'в'),
              el('select.exchange__form-select.to__select', { name: 'Валюта' }, [
              ])
            ]),
            el('div.select__wrap-bottom', [
              el('p.exchange__form-text', 'Сумма'),
              el('input.exchange__form-input', { type: 'text', placeholder: '0000', maxlength: '20', required: true }),
            ])
          ]),
          el('div.exchange__form-right', [
            el('button.exchange__form-button', 'Обменять')
          ])
        ])
      ])
    ]),
    el('div.current__wrap-right', [
      el('div.livelist', [
        el('h3.livelist-title', 'Изменение курсов в реальном времени'),
        el('div.livelist-list', [
        ]),
      ])
    ])
  ]);

  setChildren(cont, [title, bodyCurr]);
  setChildren(window.document.body, [header,cont]);

  classLoadArray.forEach(el => {
    loader(true, el);
  });

  let accCurrList = await getAccountCrypto(document.cookie.match(/(?<==)[\w]+/)[0]);
  let currList = document.querySelector('.currlist__list');
  let arrCL = Object.values(accCurrList.payload);
  loader(false, '.currlist__list');
  arrCL.forEach(element => {
    let elCurrency = el('div.currlist__item', [
      el('p.currlist__item-text', `${element.code}`),
      el('div.currlist__dots'),
      el('div.currlist__item-number', `${element.amount}`)
    ]);
    if(element.amount > 0) mount(currList, elCurrency);
  });

  const currArr = await getAllCrypto(document.cookie.match(/(?<==)[\w]+/)[0]);
  const fromSelect = document.querySelector('.from__select');
  const toSelect = document.querySelector('.to__select');

  currArr.payload.forEach(element => {
    let elOption = el('option.exchange__form-option', `${element}`, (element[0])?{ value: `${element}`, selected: true }:{ value: 'Баланс' });
    mount(fromSelect, elOption);
  });
  currArr.payload.forEach(element => {
    let elOption = el('option.exchange__form-option', `${element}`, (element[0])?{ value: `${element}`, selected: true }:{ value: 'Баланс' });
    mount(toSelect, elOption);
  });

  const choiceOne = new Choices('.from__select', {
    searchEnabled: false,
    removeItems: false,
    itemSelectText: '',
    position: 'top',
    classNames: {
      item: 'choices__item choices__itemAcc',
      containerInner: 'choices__inner choices__innerAcc',
    }
  });

  const choiceTwo = new Choices('.to__select', {
    searchEnabled: false,
    removeItems: false,
    itemSelectText: '',
    position: 'top',
    classNames: {
      item: 'choices__item choices__itemAcc',
      containerInner: 'choices__inner choices__innerAcc',
    }
  });

  const socket = new WebSocket(`ws://localhost:3000/currency-feed`);
  const livelist = document.querySelector('.livelist-list');
  loader(false, '.livelist-list');

  socket.onmessage = function(event) {
    let message = JSON.parse(event.data);
    let elem = el('div.curr', [
      el('div.curr__text', `${message.from} / ${message.to}`),
      (message.change === 1)?el('div.curr__dotsUp'): el('div.curr__dotsDown'),
      (message.change === 1)?el('div.curr__rate.curr__rate-up', `${message.rate}`):el('div.curr__rate.curr__rate-down', `${message.rate}`)
    ]);
    //
    let listCr = document.querySelectorAll('.curr');

    if (listCr.length <= 0) {
      mount(livelist, elem);
    } else if (listCr.length === 22) {
      unmount(livelist, livelist.lastChild);
      mount(livelist, elem, livelist.firstChild);
    } else {
      mount(livelist, elem, livelist.firstChild)
    }
  };
};
