import { Body, Controller,Post, UnauthorizedException, UseGuards,Get,Request, Req, Res, HttpStatus } from "@nestjs/common";
import { DealerDetailsService } from "../dealer_details/dealer_details.service";
import { DealerAuthService } from "./dealer_auth.service";
import { jwtGuard } from "src/Guards/jwt-auth.guard";
import { DealerProductsService } from "../dealer_products/dealer_products.service";
import { UpdateDealerProductDto } from "../../../dtos/update-dealer_product.dto";
import { UpdateDealerDetailDto } from "../../../dtos/update-dealer_detail.dto";
import { Response } from "express";
@Controller()
export class DealerAuthController{
constructor(private dealerAuthService:DealerAuthService,
    private dealerProductService:DealerProductsService,
    private dealerService:DealerDetailsService,
    ){}

    
    @Post('login')
    async login(@Body('mobile') mobile:number,@Body('otp') otp:number,@Req() req:any,@Res() res:Response )
        {
            const devl = process.env.SANDBOX;
            const devlotp = parseInt(process.env.DEVLOTP);
            if(devl === 'ON'){return this.dealerAuthService.validateUser(mobile,devlotp);}  
            else{return res.status(HttpStatus.NOT_FOUND).json({message:"user not found"})}     
        }

    
  /*  @Post('sendotp')
    async sendOtp(
        @Body('mobile') mobile:number){
            const devl = process.env.SANDBOX;

           {

                const {otpGen}=require('otp-gen-agent');
                const otp= await otpGen();
                //const userId = user.id;
              //  const code = (await bcrypt.hash(otp,12)).toString();
             /*  await this.dealerAuthService.updateOne(userId,code)

                await this.mailerService.sendMail({
                    to:user.emailid,
                    subject:"Here a chance to change mail",
                    html:`<p><center>Please verify otp to update your password</center></p><br><br>
                          <center>${otp}</center><br>`

                });
                return {
                    message:"email send successfully"
                }*/
            /*    await this.dealerAuthService.updateOne(id,otp);
                return otp;


            }}
            }
    @Post('verifyOtp')
    async verifyOtp(
        @Body('email') email:string,
        @Body('otp') otp:any,
    ){
             const devl = process.env.SANDBOX;
             const user = await this.dealerAuthService.emailCheck(email);

             if(devl === 'ON'){
                
                if(!user){throw new UnauthorizedException("NO user found")}
                else{
                    const devlotp = process.env.DEVLOTP; 
                    if(otp === parseInt(devlotp)){

                       return {messsage:"otp verified successfully"}

                    }
                    else{
                        return {message:"Enter valid otp "}
                    }
                }

             }
             else{
        if(!user){throw new UnauthorizedException("user not found")}
        else{

           
  

                const match = bcrypt.compare(otp,user.reset);
                if(!match){throw new UnauthorizedException('Not a valid otp matcches or otp expires')}
                      else{ const {...result} = user;
                const payload ={userid:user.id,username:user.username}
                return{
                     accesstoken :  this.jwtService.sign(payload)

                }
      
        }
        }
    }
    }

    @Post('resetpassword')
    @UseGuards(jwtGuard)
    async resetPassword(@Request() req ,@Body('password') password:string,@Body('password_confirm') password_confirm : string){
        const user = req.user;
        if(password !== password_confirm ){
            throw new UnauthorizedException("password does not match");
            }
            else{
                const hashpassword= await bcrypt.hash(password,12);    
                console.log(hashpassword);        
                await this.dealerAuthService.updatePass(user.userid,hashpassword);
                return{
                    message:"password update successfully",
                }

            }

        
        
    }*/
    @Get('gstverify')
        async gstin(@Body() gstno:string)
        {
            return this.dealerAuthService.gstverify(gstno);
        }

    @Get('panverify')
        async panverify(@Body() panno:string)
        {
            return this.dealerAuthService.panverify(panno);
        }

    @Get('fssaino')
        async fssaiverify(@Body() fssaino:number)
        {
            return this.dealerAuthService.fssaiverify(fssaino);
        }
  
    @UseGuards(jwtGuard)
    @Post('statusUpdate')
    async status(@Request() req,@Body('status') status:boolean,@Body()dealerDto:UpdateDealerDetailDto)
    {
        const user_id = req.user.dealerid;
        if(!user_id){throw new UnauthorizedException("No user found")}
        else{
        dealerDto.is_active = status;
        return  this.dealerService.updateUser(user_id,dealerDto);
    }
    
    }
    @Post("productstatusUpdate")
    async statusUpdate(@Body('id') id:number,@Body('status') status:boolean,@Body() dealerProductsDto:UpdateDealerProductDto){
        const product= this.dealerProductService.getOne(id);
                if(!product){throw new UnauthorizedException("No product found")}
                else{
                const product_id =(await product).id
                dealerProductsDto.is_available = status;
                return this.dealerProductService.update(product_id,dealerProductsDto);
        }
    }


}