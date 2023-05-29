import { render, elements } from 'skruv'
const { body, table, tbody, tr, td, span, div, button, h1, a } = elements
import { buildData } from "./store.js"

const state = {
  data: [],
  selected: false,
}

const rerender = () => render(body({},
  div({ class: "container" }, [
    div({ class: "jumbotron" },
      div({ class: "row" }, [
        div({ class: "col-md-6" }, h1({}, "Skruv")),
        div({ class: "col-md-6" },
          div({ class: "row" }, [
            div({ class: "col-sm-6 smallpad" },
              button({
                type: "button",
                class: "btn btn-primary btn-block",
                id: "run",
                onclick: () => {
                  state.data = buildData(1000)
                  rerender()
                },
              },
                "Create 1,000 rows"
              )
            ),
            div({ class: "col-sm-6 smallpad" },
              button({
                type: "button",
                class: "btn btn-primary btn-block",
                id: "runlots",
                onclick: () => {
                  state.data = buildData(10000)
                  rerender()
                },
              },
                "Create 10,000 rows"
              )
            ),
            div({ class: "col-sm-6 smallpad" },
              button({
                type: "button",
                class: "btn btn-primary btn-block",
                id: "add",
                onclick: () => {
                  state.data.push(...buildData(1000))
                  rerender()
                },
              },
                "Append 1,000 rows"
              )
            ),
            div({ class: "col-sm-6 smallpad" },
              button({
                type: "button",
                class: "btn btn-primary btn-block",
                id: "update",
                onclick: () => {
                  for (let i = 0; i < state.data.length; i += 10) {
                    state.data[i].label += " !!!";
                  }
                  state.selected = undefined
                  rerender()
                },
              },
                "Update every 10th row"
              )
            ),
            div({ class: "col-sm-6 smallpad" },
              button({
                type: "button",
                class: "btn btn-primary btn-block",
                id: "clear",
                onclick: () => {
                  state.data = []
                  rerender()
                },
              },
                "Clear"
              )
            ),
            div({ class: "col-sm-6 smallpad" },
              button({
                type: "button",
                class: "btn btn-primary btn-block",
                id: "swaprows",
                onclick: () => {
                  if (state.data.length <= 998) return
                  const temp = state.data[1]
                  state.data[1] = state.data[998]
                  state.data[998] = temp
                  rerender()
                },
              },
                "Swap Rows"
              )
            )
          ])
        )]
      )
    ),
    table({ class: "table table-hover table-striped test-data" },
      tbody({},
        state.data.map((data, i) => tr({ class: data.id === state.selected ? "danger" : "" }, [
          td({ class: "col-md-1" }, data.id),
          td({ class: "col-md-4" },
            a({ onclick: () => {
              state.selected = data.id
              rerender()
            } }, data.label),
          ),
          td({ class: "col-md-1" },
            a({ onclick: () => {
              state.data.splice(i, 1)
              rerender()
            } },
              span({
                class: "glyphicon glyphicon-remove",
                "aria-hidden": "true",
              })
            ),
          ),
          td({ class: "col-md-6" }),
        ]))
      )
    ),
    span({
      class: "preloadicon glyphicon glyphicon-remove",
      "aria-hidden": "true",
    })
  ])
), document.body)

rerender()
