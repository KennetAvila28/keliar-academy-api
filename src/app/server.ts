/**
 * @description Server class
 * @author Kennet Avila
 */

import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import * as swaggerUi from 'swagger-ui-express'
import bodyParser from 'body-parser'
// import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'

import './controllers/'
import { RegisterRoutes } from './routes/routes'
/**
 * @description Server class for initialize a webserver
 */
export class Server {
  readonly port: string
  readonly env: string
  private readonly app: express.Express

  /**
   *
   * @param port - Specified the port for the server
   * @param env - Enviroment of the server (default: 'dev')
   */
  constructor(port: string, env?: string) {
    this.app = express()
    this.port = port
    this.env = env || 'dev'
    this.initializeMiddlewares()
    this.initializeRouter()
  }

  /**
   * Initialize the server
   */
  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `App is running at http://localhost:${this.port} in ${this.env} mode`
      )
    })
  }

  /**
   * Initalize use of the middleware on the application
   */
  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    // this.app.use(helmet.xssFilter)
    // this.app.use(helmet.noSniff)
    // this.app.use(helmet.hidePoweredBy)
    // this.app.use(helmet.frameguard({ action: 'DENY' }))
    this.app.use(cors())

    if (this.env === 'dev') {
      this.app.use(morgan<Request, Response>('dev'))
      const swaggerDocument = require('../../build/swagger.json')
      this.app.use(
        '/api/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument)
      )
    }
  }

  /**
   * Allow to initialize router in case of use routes
   */
  private initializeRouter(): void {
    RegisterRoutes(this.app)

    this.app.use((_req, res: Response) => {
      res.status(404).send({
        message: 'Not Found',
      })
    })

    this.app.use(
      (err: unknown, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof Error) {
          return res.status(500).json({
            code: err.message,
            message: 'Internal Server Error',
          })
        }
      }
    )
  }
}
