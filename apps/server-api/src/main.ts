import '@brickdoc/dotenv/src/config'
import { env } from 'process'
import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { loadInitializers } from './core/initializers'
import { runCliOrServer } from './cli'

const log = new Logger('BrickdocServer')

/**
 * Create Server Application instance.
 */
async function startServer(): Promise<void> {
  const isDevelopment = env.NODE_ENV === 'development'
  // In development mode use Http2DevServer, otherwise use http/1 server.
  const serverConfig = isDevelopment ? (await import('@brickdoc/build-support')).http2DevServerConfig : {}
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(serverConfig), {
    bufferLogs: true
  })

  // Load initializers
  await loadInitializers(app, log)

  // run server
  const port = env.SERVER_PORT ?? 3000
  const protocol = isDevelopment ? 'https' : 'http'
  await app.listen(port, '0.0.0.0', () => log.log(`Listening on: ${protocol}://localhost:${port}`))
}

void runCliOrServer(startServer)
