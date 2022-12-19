import { el, mount, unmount } from 'redom';

function closeModalWindow(target) {
  target.addEventListener('click', event => {
      if (event._isClickWithinModal) return;
      unmount(document.body, target)
  });
  target.querySelector(`.${target.children[0].className}`).addEventListener('click', event => {
      event._isClickWithinModal = true;
  })
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
          unmount(document.body, target)
      }
  });
}

export const renderError = (message) => {
  if(message === 'Failed to fetch') message = 'Сервер недоступен';
  if(message === "Cannot read properties of null (reading 'token')") message = 'Такой пользователь не зарегистрирован';
  const block = el('div.error__wrap', [
    el('div.error__modal', [
      el('div.error__modal-title', 'Произошла ошибка!'),
      el('div.error__modal-message', `${message}`)
    ])
  ])
  mount(document.body, block);

  closeModalWindow(block)
};

