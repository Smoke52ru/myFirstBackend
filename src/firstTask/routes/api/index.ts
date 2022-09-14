import {ServerRoute} from "@hapi/hapi";
import {apiHandler} from "./handler";

export const apiRoute: ServerRoute = {
  method: "GET",
  path: '/api',
  handler: apiHandler
}