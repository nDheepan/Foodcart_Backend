import { Injectable } from '@nestjs/common';
import { DealerToAdminComplientsService } from 'src/Modules/Dealer/dealer_to-admin-complients/dealer_to-admin-complients.service';

@Injectable()
export class AdminComplientsService {
constructor (private readonly dealercomplients:DealerToAdminComplientsService ){}

  async getComplients(id:number){
      return this.dealercomplients.getAll(id); 
  }

  async getWeek(id:any){
      return this.dealercomplients.getWeek(id); 

  }

  async getMonth(id:any){
      return this.dealercomplients.getMonth(id); 
  }

  async getToday(id:any){
      return this.dealercomplients.getDay(id); 

}

  async getDay(id:any,date:string){
      return this.dealercomplients.getDate(id,date);
  }
  
}
