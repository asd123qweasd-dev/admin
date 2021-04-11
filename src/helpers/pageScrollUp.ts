

export function pageScrollUp () {
  console.log('pageScrollUp');
  
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}
