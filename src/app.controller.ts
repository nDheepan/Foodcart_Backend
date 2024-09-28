import { Body, Controller, Get, Post, RawBodyRequest, Req,  Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('weather')
export class AppController {
    constructor(private readonly appservice:AppService){}
  @Post()
  async addData(@Req() req : Request,@Res() res:Response){

console.log(req.body);
console.log(req['files']);

    return this.appservice.addData(req.body);

  }
}
