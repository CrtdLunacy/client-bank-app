import { el, mount } from 'redom';

function fillInput(element, inp, modal) {
  inp.value = element.textContent
  modal.style.display = 'none';
}

function appendArrayToList(arr, parent, input, modal) {
  parent.innerHTML = '';
  arr.forEach(elem => {
    const item = el('li.billing__input-item', `${elem}`, { style: 'cursor: pointer;' });
    mount(parent, item)
    item.addEventListener('click', () => {
      fillInput(item, input, modal);
    })
  })
}
// appendArrayToList(arrNumbers, list);

export const getBillsFromLS = (string, key, list, modal, input) => {
  const storageArray =  JSON.parse(localStorage.getItem(key));
  if(!storageArray) return;
  if(string) {
    let newArray = storageArray.filter(el => el.includes(string));
    if(!newArray.length) return modal.style.display = 'none';
    appendArrayToList(newArray, list, input, modal);
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
  }
}

// inp.addEventListener('input', (e) => {
//   let value = e.target.value;
//   getBillsFromLS(value, arrNumbers);
// });

