import * as Hapi from '@hapi/hapi'
import {routes} from "./routes";

const createServer = async () => {
  const server = Hapi.server({
    port: '8000',
    host: 'localhost'
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