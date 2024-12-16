import { r, e } from '@skruv/liten'
const { tbody, tr, td, a, span } = e

let id = 1, selected, row, rnd
const data = [], c= 'childNodes'
const adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy']
const colors = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange']
const nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard']
const adjectivesLength = adjectives.length
const colorsLength = colors.length
const nounsLength = nouns.length
const buildRows = (count = 1000, max = count + data.length) => {
  for (var i = data.length; i < max; i++) {
    rnd = Math.random()
    data[i] = createRow(
      '' + id++,
      adjectives[rnd * adjectivesLength | 0] + ' ' + colors[rnd * colorsLength | 0] + ' ' + nouns[rnd * nounsLength | 0]
    )
  }
}

const emptyCol = td({ opaque: true, class: 'col-md-6' })
const iconCol = td({
  class: 'col-md-1',
  onclick: (e) => {
    e.stopPropagation()
    row = e.currentTarget.parentNode
    data.splice(data.indexOf.call(row.parentElement[c], row), 1)
    row.remove()
  }
}, a({ opaque: true }, span({ class: 'glyphicon glyphicon-remove', 'aria-hidden': 'true' })))
const rowA = {
  onclick: (e) => {
    if (selected) selected.className = ''
    e.currentTarget.className = 'danger'
    selected = e.currentTarget
  },
  template: t.removeChild(t[c][0])
}
const col1A = { class: 'col-md-1' }
const col4A = { class: 'col-md-4' }
const createRow = (i, l) => tr(rowA,
  td(col1A, i),
  td(col4A, a(false, l)),
  iconCol,
  emptyCol
)

const render = () => r(tbody(false, ...data), t)
update.onclick = () => {
  for (let i = 0; i < data.length; i += 10) {
    t[c][i][c][1][c][0][c][0].nodeValue = data[i].c[1].c[0].c[0] += ' !!!'
  }
}
// TODO: test nodeValue vs textContent
swaprows.onclick = () =>
  [
    data[1],
    data[998],
    t[c][1][c][1][c][0][c][0].nodeValue,
    t[c][1][c][0][c][0].nodeValue,
    t[c][998][c][1][c][0][c][0].nodeValue,
    t[c][998][c][0][c][0].nodeValue,
  ] = [
    data[998],
    data[1],
    t[c][998][c][1][c][0][c][0].nodeValue,
    t[c][998][c][0][c][0].nodeValue,
    t[c][1][c][1][c][0][c][0].nodeValue,
    t[c][1][c][0][c][0].nodeValue,
  ]
run.onclick = () => {
  data.length = 0
  buildRows()
  render()
}
runlots.onclick = () => {
  data.length = 0
  buildRows(10000)
  render()
}
add.onclick = () => {
  buildRows()
  render()
}
clear.onclick = () => {
  data.length = 0
  t.textContent = ''
}

// Alternate Input handlers
// update.onclick = () => {
//   for (let i = 0; i < data.length; i += 10) {
//     data[i].c[1].c[0].c[0] += ' !!!'
//   }
//   render()
// }
// swaprows.onclick = () => ([data[1], data[998]] = [data[998], data[1]]) && render()
// run.onclick = () => {
//   data.length = 0
//   buildRows()
//   render()
// }
// runlots.onclick = () => {
//   data.length = 0
//   buildRows(10000)
//   render()
// }
// add.onclick = () => {
//   buildRows()
//   render()
// }
// clear.onclick = () => {
//   data.length = 0
//   render()
// }
