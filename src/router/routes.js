import { renderAccount, renderBill } from '../pages/account';
import { renderForm } from '../pages/authorize-form';
import { renderCurrents } from '../pages/currents';
import { renderMap } from '../pages/map';
import { reRenderDetailAcc } from '../pages/billDetails';
import { renderError } from '../components/Error';
import { openBill } from "../API/Api";
import { addListeners, addListenersAcc, addListenersCurr, addPaginationListeners } from "../modules/listeners";
import { authorize, reAuthorize } from '../modules/utility';

export async function routePages(path) {
  if (path === '') {
    //если перешли на страницу авторизации
    document.body.innerHTML = '';
    renderForm();
    const btn = document.querySelector('.form__button');
    btn.addEventListener('click', async(e) => {
      e.preventDefault();
      try{
        let data = await authorize();
        history.pushState({ 'page_id': 'account' }, null, '?account');
        renderAccount(data.payload);
        let token = document.cookie.match(/(?<==)[\w]+/)[0];
        addListeners(token);
      }catch(e){
        renderError(e.message);
      }
    });
  } else if (path === '?account') {
    let token = document.cookie.match(/(?<==)[\w]+/)[0];
    try{
      let data = await reAuthorize(token);
      renderAccount(data.payload);
      addListeners(token);
    } catch (err) {
      renderError(err.message);
    }
    //если перешли на страницу счетов

  } else if(path === '?currency'){
    let token = document.cookie.match(/(?<==)[\w]+/)[0];
    //если перешли на страницу валют
    renderCurrents();
    addListenersCurr(token);
  } else if(path === '?map'){
    //если перешли на страницу валют
    renderMap();
    document.querySelector('.header__button').addEventListener('click', () => {
      history.pushState({ 'page_id': 'account' }, null,`/`);
      document.body.innerHTML = '';
      renderForm();
    })
  } else if(path.includes('history')){
    //если перешли на страницу валют
    let token = document.cookie.match(/(?<==)[\w]+/)[0];
    let bill = window.location.search.match(/(?<==)[\w]+/)[0];
    let obj = await openBill(bill, token);
    reRenderDetailAcc(obj.payload);
    addPaginationListeners(obj.payload);
    let btn = document.querySelector('.billing__button');
    // btn.removeEventListener('click', );
    document.querySelector('.billing__button').addEventListener('click', () => {
      history.pushState({ 'page_id': 'account' }, null,`?account=${bill}`);
      renderBill(obj.payload);
      addListenersAcc(obj.payload, bill, token);
    })
  } else {
    let token = document.cookie.match(/(?<==)[\w]+/)[0];
    let bill = window.location.search.match(/(?<==)[\w]+/)[0];
    let obj = await openBill(bill, token);
    renderBill(obj.payload);
    addListenersAcc(obj.payload, bill, token);
  }
}

export function popstateChange() {
  window.addEventListener('popstate', async() => {
    let path = window.location.search;
    if (path === '') {
      document.body.innerHTML = '';
      renderForm();
    } else if (path === '?account') {
      let token = document.cookie.match(/(?<==)[\w]+/)[0];
      let data = await reAuthorize(token);
      renderAccount(data.payload);
      addListeners(token);
    } else if (path === '?currency'){
      renderCurrents();
    } else if (path === '?map'){
      renderMap();
      document.querySelector('.header__button').addEventListener('click', () => {
        history.pushState({ 'page_id': 'account' }, null,`/`);
        document.body.innerHTML = '';
        renderForm();
      })

    } else if (path.includes('history')){
      let token = document.cookie.match(/(?<==)[\w]+/)[0];
      let bill = window.location.search.match(/(?<==)[\w]+/)[0];
      let obj = await openBill(bill, token);
      reRenderDetailAcc(obj.payload);
      addPaginationListeners(obj.payload);
      let btn = document.querySelector('.billing__button');
      btn.removeEventListener('click');
      btn.addEventListener('click', () => {
        history.pushState({ 'page_id': 'account' }, null,`?account=${bill}`);
        renderBill(obj.payload);
        addListenersAcc(obj.payload, bill, token);
      })
    } else {
      let token = document.cookie.match(/(?<==)[\w]+/)[0];
      let bill = window.location.search.match(/(?<==)[\w]+/)[0];
      let obj = await openBill(bill, token);
      renderBill(obj.payload);
      addListenersAcc(obj.payload, bill, token);
    }
  });
}
