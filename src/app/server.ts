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
import helmet from 'helmet'
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
    this.app
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: false }))
      .use(helmet())

    // this.app.use(helmet.xssFilter)
    // this.app.use(helmet.noSniff)
    // this.app.use(helmet.hidePoweredBy)
    // this.app.use(helmet.frameguard({ action: 'DENY' }))
    this.app.use(cors())
    if (this.env === 'dev') {
      this.app.use(morgan<Request, Response>('dev'))
      const swaggerDocument = require('../../build/swagger.json')
      swaggerDocument.servers[0].url = `http://localhost:${this.port}/api/v1`
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

    this.app
      .use((_req, res: Response) => {
        res.status(404).send({
          message: 'Not Found',
        })
      })
      .use((_req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
          'Access-Control-Allow-Headers',
          `Origin, X-Requested-With, Content-Type, Accept, Authorization`
        )

        next()
      })
      .use((err: unknown, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof Error) {
          console.error(err)
          return res.status(500).json({
            code: err.message ?? err.name,
            message: 'Internal Server Error',
          })
        }
        //TODO: move this interface to a separate file
        interface ErrorCodeNumber {
          status?: number
        }
        const errorNumber = err as ErrorCodeNumber
        if (errorNumber.status) {
          if (errorNumber.status === 401)
            return res.status(errorNumber.status).json({
              code: 'Auth is required',
              message: 'Unauthorized',
            })
          return res.status(errorNumber.status).json({
            code: errorNumber.status,
            message: 'Error in console',
          })
        }
      })
  }
}
