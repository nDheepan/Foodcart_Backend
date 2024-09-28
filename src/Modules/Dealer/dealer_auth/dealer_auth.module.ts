import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../../../constants';
import { dealerDetailsModule } from '../dealer_details/dealer_details.module';
import { DealerAuthController } from './dealer_auth.controller';
import { DealerAuthService } from './dealer_auth.service';
import { DealerProfileModule } from '../dealer_profile/dealer_profile.module';
import {  DealerStrategy} from 'src/strategies/jwt.strtegy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { DealerProductsModule } from '../dealer_products/dealer_products.module';
import { OrderManagementModule } from 'src/Modules/orders/order-management/order-management.module';
import { RatingModule } from 'src/Modules/rating/rating.module';
import { DealerOrderHistoryModule } from '../dealer_order_history/dealer_order_history.module';
import { DealerPayoutModule } from '../dealer_payout/dealer_payout.module';
import { DealerRatingModule } from '../dealer_rating/dealer_rating.module';
import { DealerManagestaffModule } from '../dealer_managestaff/dealer_managestaff.module';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[
    dealerDetailsModule, 
    ConfigModule,
    DealerRatingModule,
    DealerProductsModule,
    forwardRef(()=>MailerModule.forRoot({
      transport:{
        host:'localhost',
        port:1025
      },
      defaults:{
        from:'admin@example.com'
      }

  }))
    ,JwtModule.register({
  secret:jwtConstants.dealer_secret,
  signOptions:{expiresIn:'24hr'},
  }),],
  providers: [DealerAuthService,ConfigService ,DealerStrategy,jwtGuard,RolesGuard],
  exports:[DealerAuthService,DealerStrategy],
  controllers: [DealerAuthController]
})
export class dealerAuthModule {}
