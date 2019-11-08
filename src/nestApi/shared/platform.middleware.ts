import { Request, Response } from 'express'
import PlatformFactory from './PlatformFactory'

export default function platformMiddleware(req: Request, res: Response, next) {
  PlatformFactory.prototype.request = req
  next()
}