import * as Hapi from '@hapi/hapi'
import {routes} from "./routes";
import hapi_response_utilities from "hapi-response-utilities"

const createServer = async () => {
  const server = Hapi.server({
    port: '8000',
    host: 'localhost'
  })

  await server.register({
    plugin: hapi_response_utilities
  })
  server.route(routes)

  await server.start();
  console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
})

createServer()