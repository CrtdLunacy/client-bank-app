import { el, setChildren } from 'redom';
import ymaps from 'ymaps';
import { getBanksPosition } from '../API/Api';
import { loader } from "../components/loading";
import { renderError } from '../components/Error';

const cont = el('div.container');
const origin = window.location.origin;

export async function renderMap() {
  const header = el('header.headerback', [
    el('div.header.container', [
      el('div.header__wrap.header__wrap-left', [
        el('h1.header__logo', 'Coin.')
      ]),
      el('div.header__wrap.header__wrap-right', [
        el('a.header__link.active', 'Банкоматы', { href: `${origin}?map` }),
        el('a.header__link', 'Счета', { href: `${origin}?account` }),
        el('a.header__link', 'Валюта', { href: `${origin}?currency` }),
        el('button.header__button', 'Выйти', { type: 'button'}),
      ])
    ])
  ]);

  const mapCont = el('div.map', [
    el('h2.map__title', 'Карта банкоматов'),
    el('div#map')
  ])

  setChildren(cont, mapCont);
  setChildren(document.body, [header, cont]);
  loader(true, '.map');

  const mapData = await getBanksPosition();

  let mapwrap = document.getElementById('map');
  mapwrap.style.height = "100vh";
  mapwrap.style.width = "100%";
  ymaps
  .load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
  .then(maps => {
    loader(false, '.map');
    const map = new maps.Map(mapwrap, {

      center: [55.76, 37.64],
      zoom: 10
    });
    mapData.payload.forEach(geoObj => {
      map.geoObjects.add(new maps.Placemark([geoObj.lat, geoObj.lon], {
        balloonContent: `<div class='baloon'>Coin bank</div>`
      }))
    });
  })
  .catch(error => {
    renderError('Загрузка карты недоступна, повторите позднее.');
  });

}










