import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleServiceService {

    scheduleParam(s_date:string,s_time:string){

        const year = new Date(s_date).getFullYear();
        const month = new Date(s_date).getMonth();
        const day =  new Date(s_date).getDate();
        
        const hour = new Date(s_time).getHours();
        const minutes = new Date(s_time).getMinutes();
    
        const date  = new Date(year,month,day,hour,minutes,0);
        return date;
    
    }
}
