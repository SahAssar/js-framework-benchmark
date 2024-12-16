import { r, e } from '@skruv/liten'

const root = tbl
const { tbody, tr, td, a, span } = e

// Data generation
const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"]
const colors = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"]
const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"]
const [l1, l2, l3] = [adjectives.length, colors.length, nouns.length]
let id = 1
const buildData = (count = 1000, max = count + data.length) => {
  for (var i = data.length; i < max; i++) data[i] = {
    i: id++,
    l: `${adjectives[Math.floor(Math.random() * l1)]} ${colors[Math.floor(Math.random() * l2)]} ${nouns[Math.floor(Math.random() * l3)]}`,
    k: {}
  }
}

// State variables
let data = []
let selected = {}

// Cached elements
const emptyCol = td({ cache: true, class: "col-md-6" })
const icon = a({ cache: true }, span({ class: "glyphicon glyphicon-remove", 'aria-hidden': "true" }))

// Main render function
const render = () => r(tbody(...data.map(d => tr(
  { class: d === selected && "danger", key: d.k },
  td({ class: "col-md-1" }, d.i),
  td({
    class: "col-md-4", onclick: () => {
      d.k = {}
      selected.k = {}
      selected = d
      render()
    }
  }, a(d.l)),
  td({
    class: "col-md-1", onclick: () => {
      data.splice(data.indexOf(d), 1)
      render()
    }
  }, icon),
  emptyCol
))), root)

// Input handlers
run.onclick = () => {
  data = []
  buildData()
  render()
}
runlots.onclick = () => {
  data = []
  buildData(10000)
  render()
}
add.onclick = () => {
  buildData()
  render()
}
update.onclick = () => {
  for (let i = 0; i < data.length; i += 10) {
    data[i].l += " !!!"
    data[i].k = {}
  }
  render()
}
clear.onclick = () => {
  data = []
  render()
}
swaprows.onclick = () => {
  [data[1], data[998]] = [data[998], data[1]]
  render()
}
