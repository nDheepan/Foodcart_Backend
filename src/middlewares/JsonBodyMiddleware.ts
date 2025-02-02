import { Injectable, NestMiddleware } from '@nestjs/common'
import * as bodyParser from 'body-parser'

@Injectable()
export class JsonBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => any) {
   bodyParser.json()(req as any, res as any, next)
  }
}