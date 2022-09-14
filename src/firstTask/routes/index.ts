import {ServerRoute} from "@hapi/hapi";
import {apiRoute} from "./api";

export const routes: ServerRoute[] = [
  apiRoute
]