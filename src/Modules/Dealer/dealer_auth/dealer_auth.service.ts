import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DealerDetailsService } from '../dealer_details/dealer_details.service';
import axios from 'axios';
import { UpdateDealerDetailDto } from '../../../dtos/update-dealer_detail.dto';
import { count } from 'node:console';
import { DealerManagestaffService } from '../dealer_managestaff/dealer_managestaff.service';
@Injectable()
export class DealerAuthService {
  constructor(private dealerDetailservice: DealerDetailsService,
    private jwtService:JwtService,
    ) {}

  async validateUser(mobile:number,devl:number): Promise<any> {
   
    const user = await this.dealerDetailservice.getuser(mobile);
        if(!user)
        {
          throw new UnauthorizedException("User not found");
        }
        else{
    //     const match=await bcrypt.compare(pass,user.password);
      //  if(match)
      //   {
            const devlotp = parseInt(process.env.DEVLOTP);
      
        if(devl === devlotp){
        const {...result} = user;
          if(user.dealer_id){
          const payload={dealerid:user.dealer_id,role:user.dealer_role};
          console.log(payload)
          return {
            access_token:this.jwtService.sign(payload)
          }  
        }
          else{
            const payload={dealerid:user.dealer_id,staffid:user.managestaff_id,role:user.managestaff_role};

          return {
            access_token:this.jwtService.sign(payload)
          }    }}
          else{
          throw new UnauthorizedException('unauthorized access');
        }
      }
 }

    async emailCheck(email:string){
      return this.dealerDetailservice.findUser(email);
    }

    async verify(code:any){
      const user= this.dealerDetailservice.getOne(code);
            if(!user){ throw new UnauthorizedException()}
            else{
            return user;          
        }
    }

    async updatePass(id:number,data:any){
       const result = await this.dealerDetailservice.updatePass(id,data);
       if(result){return result}
       else{throw new BadRequestException()}
    }

    async updateOne(id:number,data:any){
       const result =await  this.dealerDetailservice.updateOne(id,{reset:data});
       if(result){return result}
       else{throw new BadRequestException()}
    }


    async gstverify(gstnumber:string){
      if(gstnumber.length === 15)
      {return 'Active';}
      else{return "Not a valid  GST number";}

    }


        /*
        const uri = `http://sheet.gstincheck.co.in/check/18c4a0cbf2f182ed08907ebc77260fcb/27AAACT2727Q1ZW `;
        try {
            const response = await axios.get(uri)
            const gstStatus = response.data?.data?.sts;
            if (gstStatus == 'Active') {
                return 'Active';
            } else if(gstStatus == 'Cancelled suo-moto') {
                return 'GSTIN is not Active';
            }
            else{
              return 'no api call';
            }
        } catch (error) {
            console.error(error);
            return 'Failed to fetch GST data';
        }*/
    
    async panverify(panno:string){
          if(panno.length === 10)
          {
                return 'Active';
          }
          else{
            return "Not a valid  pan number";
          }

     
     /* const pan = panno;
      const uri = `http://sheet.gstincheck.co.in/check/18c4a0cbf2f182ed08907ebc77260fcb/${panno} `;
      try {
          const response = await axios.get(uri)
          const gstStatus = response.data?.data?.sts;
          if (gstStatus == 'Active') {
              return 'Active';
          } 
          else{
            return 'no api call';
          }
      } catch (error) {
          console.error(error);
          return 'Failed to fetch pan data';
      }*/
    }


  async fssaiverify(fssaino:number){
    if((fssaino.toString()).length === 14)
    {return 'Active';}
    else{return "Not a valid  pan number";}

  }
  
  
  
  /*  const uri = `http://sheet.gstincheck.co.in/check/18c4a0cbf2f182ed08907ebc77260fcb/27AAACT2727Q1ZW `;
    try {
        const response = await axios.get(uri)
        const gstStatus = response.data?.data?.sts;
        if (gstStatus == 'Active') {
            return 'Active';
        } else if(gstStatus == 'Cancelled suo-moto') {
            return 'fssai is not Active';
        }
        else{
          return 'no api call';
        }
    } catch (error) {
        console.error(error);
        return 'Failed to fetch fssai data';
    }*/
  

      async updateStatus(userid:string,updateDealerDto:UpdateDealerDetailDto){

        const result = await  this.dealerDetailservice.updateUser(userid,updateDealerDto);
              if(result){return result}
              else{throw new BadRequestException()}
      }

 }
    
   
  
  
  
