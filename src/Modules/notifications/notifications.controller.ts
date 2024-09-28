import { Body, Controller, Post,Headers, UnauthorizedException} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Role} from 'src/enum/role.enum';
import { jwtConstants } from '../../../constants'

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationService:NotificationsService
    ){}
    @Post('dealer')
    async saveDealerFCMToken(@Body() body: { fcmToken: string }, @Headers('authorization') authHeader: string) {
      const token = authHeader?.split(' ')[1];
       if (!token) {
         throw new UnauthorizedException('Authorization token missing');
       }
      const dealerId = await this.notificationService.verifyJWTTokenAndGetUserId(token, jwtConstants.dealer_secret);
      await this.notificationService.saveFCMToken(dealerId, body.fcmToken, Role.DEALER);
      return { message: 'FCM token saved successfully for dealer' };
    }  
    @Post('user')
    async saveUserFCMToken(@Body() body: { fcmToken: string }, @Headers('authorization') authHeader: string) {
      const token = authHeader?.split(' ')[1];
       if (!token) {
         throw new UnauthorizedException('Authorization token missing');
       }
      const userId = await this.notificationService.verifyJWTTokenAndGetUserId(token, jwtConstants.customer_secret);
      await this.notificationService.saveFCMToken(userId, body.fcmToken, Role.USER);
      return { message: 'FCM token saved successfully for user' };
    }
    @Post('agent')
    async saveAgentFCMToken(@Body() body: { fcmToken: string }, @Headers('authorization') authHeader: string) {
      const token = authHeader?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Authorization token missing');
      }
      const agentId = await this.notificationService.verifyJWTTokenAndGetUserId(token,jwtConstants.agent_secret);
      await this.notificationService.saveFCMToken(agentId, body.fcmToken, Role.AGENT);
      return { message: 'FCM token saved successfully for agent' };
    }
}