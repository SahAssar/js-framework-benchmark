import { render, createState, elements } from 'skruv'
const { body, table, tbody, tr, td, span, div, button, h1, a } = elements
import { buildData } from "./store.js"

const stateGenerator = createState({
  data: [],
  selected: false,
})

render(body({},
  div({ class: "container" }, [
    div({ class: "jumbotron" },
      div({ class: "row" }, [
        div({ class: "col-md-6" }, h1({}, "Skruv-state")),
        div({ class: "col-md-6" },
          div({ class: "row" }, [
            div({ class: "col-sm-6 smallpad" },
              button({
                type: "button",
                class: "btn btn-primary btn-block",
                id: "run",
                onclick: () => stateGenerator.data = buildData(1000),
              },
                "Create 1,000 rows"
              )
            ),
            div({ class: "col-sm-6 smallpad" },
              button({
                type: "button",
                class: "btn btn-primary btn-block",
                id: "runlots",
                onclick: () => stateGenerator.data = buildData(10000),
              },
                "Create 10,000 rows"
              )
            ),
            div({ class: "col-sm-6 smallpad" },
              button({
                type: "button",
                class: "btn btn-primary btn-block",
                id: "add",
                onclick: () => stateGenerator.data.push(...buildData(1000)),
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
                  for (let i = 0; i < stateGenerator.data.length; i += 10) {
                    stateGenerator.data[i].label += " !!!";
                  }
                  stateGenerator.selected = undefined
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
                onclick: () => stateGenerator.data = [],
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
                  if (stateGenerator.data.length <= 998) return
                  const temp = {...stateGenerator.data[1]}
                  stateGenerator.data[1] = stateGenerator.data[998]
                  stateGenerator.data[998] = temp
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
        async function * () {
          for await (const state of stateGenerator) {
            yield state.data.map((data, i) => tr({ class: data.id === state.selected ? "danger" : "" }, [
              td({ class: "col-md-1" }, data.id),
              td({ class: "col-md-4" },
                a({ onclick: () => state.selected = data.id }, data.label),
              ),
              td({ class: "col-md-1" },
                a({ onclick: () => state.data.splice(i, 1) },
                  span({
                    class: "glyphicon glyphicon-remove",
                    "aria-hidden": "true",
                  })
                ),
              ),
              td({ class: "col-md-6" }),
            ]))
          }
        }
      )
    ),
    span({
      class: "preloadicon glyphicon glyphicon-remove",
      "aria-hidden": "true",
    })
  ])
), document.body)
