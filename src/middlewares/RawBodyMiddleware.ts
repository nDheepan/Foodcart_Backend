import { Injectable, NestMiddleware } from '@nestjs/common'
import { json } from 'body-parser'
import { Request, Response } from 'express'


@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  public constructor() {}

  public use(req: Request, res: Response<any>, next: () => any): any {
    json({
      verify: (req: any, res, buffer) => {
        if (Buffer.isBuffer(buffer)) {
          const rawBody = Buffer.from(buffer)
          req['parsedRawBody'] = rawBody
        }
        return true
      },
    })(req, res as any, next)
  }
}