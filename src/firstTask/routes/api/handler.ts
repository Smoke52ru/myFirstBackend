import {Lifecycle} from "@hapi/hapi";
import axios from "axios";
import {JSDOM} from 'jsdom'
import {parseByUrl} from "./parser";

const errorResponse: Lifecycle.ReturnValue = {
  status: 400,
  result: "Bad Request",
  message: "Argument 'url' is required"
}

export const apiHandler: Lifecycle.Method = (request) => {
  const links = typeof request.query.url === 'string'
    ? Array(request.query.url)
    : request.query.url

  if (!links) return errorResponse

  const frequentPromises = links.map(async (link: string) => parseByUrl(link))

  Promise.all(frequentPromises)
    .then((texts)=>{
      console.log(texts)
    })

  // console.log(textPromises)

  return 1
}