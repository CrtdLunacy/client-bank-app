import { popstateChange, routePages } from './router/routes';

let path = window.location.search;

export function load () {
  routePages(path)
  popstateChange()
}
