import { Module } from '@nestjs/common';
import { AgentauthService } from './agentauth.service';
import { AgentauthController } from './agentauth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { jwtConstants } from '../../../../constants';
import { AgentStrategy} from 'src/strategies/jwt.strtegy';
import { Agent } from 'src/entities/agent.entity';
import { AgentService } from '../agent/agent.service';


@Module({
  imports: [
    JwtModule.register({
      secret:jwtConstants.agent_secret,
      signOptions:{expiresIn:'2d'}, 
    }),
    TypeOrmModule.forFeature([Agent]),
  ],
  providers: [AgentauthService,AgentStrategy,jwtGuard,AgentService],
  controllers: [AgentauthController],
  exports:[JwtModule]
})
export class AgentauthModule {}
