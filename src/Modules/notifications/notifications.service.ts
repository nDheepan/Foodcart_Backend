import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerdetailService } from '../Customer/customerdetail/customerdetail.service';
import * as jwt from 'jsonwebtoken'
import { DealerDetailsService } from '../Dealer/dealer_details/dealer_details.service';
import { Role } from 'src/enum/role.enum';
import admin from 'firebase-admin'
import { AgentService } from '../delivery_agent/agent/agent.service';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly userService:CustomerdetailService,
        private readonly dealerService:DealerDetailsService,
        private readonly agentService:AgentService
    ){}
    async  verifyJWTTokenAndGetUserId(token: string, secret: string) {
       try {
          const decodedToken = jwt.verify(token, secret) as { id: number };
          const userId = decodedToken.id;
         return userId;
      } catch (error) {
         console.error('Error verifying JWT token:', error);  
            throw new UnauthorizedException('Invalid or expired JWT token')
      }
    }
    async saveFCMToken(id: number, fcmToken: string, role: Role) {
      try {
        const service=await this.getServiceBasedOnRole(role)
          await service.updateUserFCMToken(id, fcmToken);
      } catch (error) {
          console.error('Error saving FCM token:', error);
          throw new Error('Failed to save FCM token');
      }
  }
 async  getServiceBasedOnRole(role: Role) {
    let service;
    switch(role) {
      case Role.DEALER:
        service = this.dealerService;
        break;
      case Role.USER:
        service = this.userService;
        break; 
      case Role.AGENT:
        service = this.agentService;
        break; 
      default:
        throw new Error('Invalid role');
    }
    return service;
  }
    
  async sendNotification( title: string, body: string,role:Role,id:string): Promise<any> {
    try {
      const service=await this.getServiceBasedOnRole(role)
      const user = await service.get(id)
      console.log(user)
      if (!user || !user.fcmtoken) {
        throw new Error('User not found or FCM token not available');
      }
      const message: admin.messaging.Message = {
        token: user.fcmtoken,
        notification: {
          title: title,
          body: body,
        },
      };
      console.log(message)
      await admin.messaging().send(message);
      console.log('Notification sent successfully');
      return message
    } catch (error) {
      console.error('Error sending notification:', error);
      throw new Error('Failed to send notification');
    }
  
  }
 
}

