export function getScroll() {
  const supportPageOffset = window.pageXOffset !== undefined
  const isCSS1Compat = document.compatMode === 'CSS1Compat'

  const scroll = { left: 0, top: 0 }
  if (supportPageOffset) {
    scroll.left = window.pageXOffset
    scroll.top = window.pageYOffset
  } else if (isCSS1Compat) {
    scroll.left = document.documentElement.scrollLeft
    scroll.top = document.documentElement.scrollTop
  } else {
    scroll.left = document.body.scrollLeft
    scroll.top = document.body.scrollTop
  }
  return scroll
}
