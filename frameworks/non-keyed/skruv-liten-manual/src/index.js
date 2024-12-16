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
    l: `${adjectives[Math.floor(Math.random() * l1)]} ${colors[Math.floor(Math.random() * l2)]} ${nouns[Math.floor(Math.random() * l3)]}`
  }
}

// State variables
let data = []
let selected = {}

// Cached elements
const emptyCol = td({ cache: true, class: "col-md-6" })
const icon = a({ cache: true }, span({ class: "glyphicon glyphicon-remove", 'aria-hidden': "true" }))

// Main render functions
const render = () => r(tbody(...data.map(renderRow)), root)
const renderRow = (d) => tr(
  td({ class: "col-md-1" }, d.i),
  td({
    class: "col-md-4",
    onclick: (e) => {
      selected.className = ""
      e.currentTarget.parentNode.className = "danger"
      selected = e.currentTarget.parentNode
    }
  }, a(d.l)),
  td({
    class: "col-md-1",
    onclick: (e) => {
      data.splice(data.indexOf(d), 1)
      e.currentTarget.parentNode.parentNode.removeChild(e.currentTarget.parentNode)
    }
  }, icon),
  emptyCol
)

// Input handlers
update.onclick = () => {
  for (let i = 0; i < data.length; i += 10) {
    tbl.childNodes[i].childNodes[1].childNodes[0].childNodes[0].nodeValue = data[i].l += " !!!"
  }
}
swaprows.onclick = () => [
  data[1],
  data[998],
  tbl.childNodes[1].childNodes[1].childNodes[0].childNodes[0].nodeValue,
  tbl.childNodes[1].childNodes[0].childNodes[0].nodeValue,
  tbl.childNodes[998].childNodes[1].childNodes[0].childNodes[0].nodeValue,
  tbl.childNodes[998].childNodes[0].childNodes[0].nodeValue,
] = [
  data[998],
  data[1],
  tbl.childNodes[998].childNodes[1].childNodes[0].childNodes[0].nodeValue,
  tbl.childNodes[998].childNodes[0].childNodes[0].nodeValue,
  tbl.childNodes[1].childNodes[1].childNodes[0].childNodes[0].nodeValue,
  tbl.childNodes[1].childNodes[0].childNodes[0].nodeValue,
]
run.onclick = () => {
  data.length = 0
  buildData()
  render()
}
runlots.onclick = () => {
  data.length = 0
  buildData(10000)
  render()
}
add.onclick = () => {
  buildData()
  render()
}
clear.onclick = () => {
  data.length = 0
  tbl.textContent = ''
}
