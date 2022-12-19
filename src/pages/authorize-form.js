import { el, setChildren } from 'redom';

const cont = el('div.container');

const header = el('header.headerback', [
  el('div.header.container', [
    el('div.header__wrap', [
      el('h1.header__logo', 'Coin.')
    ])
  ])
]);

export function renderForm() {
  const form = el('div.wrapper', [
    el('form.form.auth-form', [
      el('h3.form__name', 'Вход в аккаунт'),
      el('label.form__label.form__label-login', 'Логин', [
        el('input.form__input.form__input-login', { type: 'text', placeholder: 'Login', maxlength: '12', required: true }),
      ]),
      el('label.form__label.form__label-password', 'Пароль', [
        el('input.form__input.form__input-password', { type: 'password', placeholder: 'Password', maxlength: '20', required: true }),
      ]),
      el('button.form__button', 'Войти', { type: 'submit' }),
    ]),
  ]);
  setChildren(cont, form);
  setChildren(window.document.body, [header,cont]);

};





