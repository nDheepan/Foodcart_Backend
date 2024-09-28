import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import Dealer_Entity from 'src/entities/dealer_detail.entity';
import DealerMenu from 'src/entities/dealer_product.entity';
import { CustomerfilterController } from './customerfilter.controller';
import { CustomerfilterService } from './customerfilter.service';

@Module({
  imports:[TypeOrmModule.forFeature([Dealer_Entity,DealerMenu])],
  providers: [CustomerfilterService],
  controllers: [CustomerfilterController]
})
export class CustomerfilterModule {}
