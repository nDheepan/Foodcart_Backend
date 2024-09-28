import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
 
async addData(body:any){
 return {message:"added successfully",body}

}

  
}
