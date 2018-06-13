export function stopPropagation(ev) {
  ev.stopPropagation();
  ev.cancelBubble = true
}

export function preventDefault(ev) {
  ev.preventDefault()
}

export function stopDefault(ev) {
  stopPropagation(ev);
  preventDefault(ev)
}

export function screenSize() {
  return typeof window !== 'undefined' ? {width: screen.width, height: screen.height} : {width: 0, height: 0}
}

export function browserAvailSize() {
  return typeof window !== 'undefined' ? {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  } : {width: 0, height: 0}
}

export function getScroll() {
  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = (document.compatMode || "") === "CSS1Compat";

  const left = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
  const top = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
  return {left, top}
}
