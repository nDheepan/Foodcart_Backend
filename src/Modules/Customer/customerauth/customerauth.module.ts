import { Module } from '@nestjs/common';
import { CustomerauthService } from './customerauth.service';
import { CustomerauthController } from './customerauth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from '../../../../constants';
import { JwtModule } from '@nestjs/jwt';
import { CustomerdetailService } from '../customerdetail/customerdetail.service';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { User } from 'src/entities/customer_detail.entity';
import { customerStrategy } from 'src/strategies/jwt.strtegy';

@Module({
  imports: [
    JwtModule.register({
      secret:jwtConstants.customer_secret,
      signOptions:{expiresIn:'2d'}, 
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers:[CustomerauthController],
  providers: [CustomerdetailService,CustomerauthService,customerStrategy,jwtGuard],
  exports: [JwtModule],
})
export class CustomerauthModule {}
