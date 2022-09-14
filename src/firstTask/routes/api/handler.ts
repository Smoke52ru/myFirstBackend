import {Lifecycle} from "@hapi/hapi";
import {parseByUrl} from "./parser";

const errorResponse: Lifecycle.ReturnValue = {
  status: 400,
  result: "Bad Request",
  message: "Argument 'url' is required"
}

const createRow = (name: string, data: string[]) => {
  const cellsContent = [name, ...data]
    .map((cell) => `<td>${cell}</td>`)
    .join('')

  return `<tr>${cellsContent}</tr>`
}

const createTable = (rowNames: string[], rowData: string[][]) => {
  const rows = rowNames
    .map((name, i) => createRow(name, rowData[i]))
    .join('')

  return (`<table>${rows}</table>`)
}

export const apiHandler: Lifecycle.Method = (request, h) => {
  const links = typeof request.query.url === 'string'
    ? Array(request.query.url)
    : request.query.url

  if (!links) return errorResponse

  return Promise.all(links.map(async (link: string) => parseByUrl(link)))
    .then((frequentWords: string[][]) => {
      console.log(frequentWords)

      return h.response(createTable(links, frequentWords))
        .header('Content-Type', 'text/html;')
    })
}