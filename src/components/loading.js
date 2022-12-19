import { el, mount, unmount } from 'redom';

export function loader(bool, classBox) {
  const parent = (classBox)? document.querySelector(classBox): document.body;
  const load = el('div.loader');
  if(!bool) return unmount(parent, parent.lastChild)
  mount(parent, load);
}


