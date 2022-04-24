/**
 * @description App class for initialize de server and configurations
 * @author Kennet Avila
 * @version 1.0
 */
import dotenv from 'dotenv'
import { Server } from './server'

/**
 * Application class for configuration and initialization
 */
export class Application {
  server?: Server

  /**
   * Run the application
   */
  async start() {
    dotenv.config()
    const port = process.env.PORT || '5000'
    this.server = new Server(port)
    this.server.listen()
  }
}
