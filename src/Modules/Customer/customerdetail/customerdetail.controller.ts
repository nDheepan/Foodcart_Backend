import { Body, Controller, Get, Param, Put, UseGuards,Request, UsePipes} from '@nestjs/common';
import { CustomerdetailService } from './customerdetail.service';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { User } from 'src/entities/customer_detail.entity';
import { UpdatecustomerDetailDto } from 'src/dtos/update-user-detail.dto';

@Controller()
export class CustomerdetailController {
    constructor( private readonly customerdetailService:CustomerdetailService){}
    @Get()
      async findAll(){
           return this.customerdetailService.getAlluser()
      }
      /*@UseGuards(JwtAuthGuard)
      @Post()
      async adduser(@Body() dto:User,@Res() res:Response){
         const user =await this.customerdetailService.createuser(dto)
         const responseData = { message: 'Data received successfully' };
       const users=  res.status;
        console.log(users)
        return user
      }*/
      @UseGuards(jwtGuard)
      @Put()
      async update(@Body() dto:UpdatecustomerDetailDto ,@Request()req){
        return this.customerdetailService.update(dto,req)
     }  
  
   @Get('id/:userid')
     async get(@Param('userid') userid:number){
         const users=await this.customerdetailService.get(userid)
         console.log(users)
         return users
     }  
}
