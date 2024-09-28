import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminNotificationService } from 'src/Modules/Admin/admin_notification/admin_notification.service';

@Injectable()
export class DealerNotificationService {

  constructor(private readonly adminnotification:AdminNotificationService){}
  

    async findAll(id: any) {

      const result =await this.adminnotification.getNotification(id);
      if(result){return result}
      else{throw new BadRequestException()}
    }

    async findOne(id:number,notificationid:number){

      const result = await this.adminnotification.getOneNotification(id,notificationid);
          if(result){return result}
          else{throw new BadRequestException()}
        }
}
