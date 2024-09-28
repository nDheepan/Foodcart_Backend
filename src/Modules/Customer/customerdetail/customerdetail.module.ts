import { Module } from '@nestjs/common';
import { CustomerdetailService } from './customerdetail.service';
import { CustomerdetailController } from './customerdetail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/customer_detail.entity';



@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [CustomerdetailService],
  controllers: [CustomerdetailController],
  exports:[CustomerdetailService]
})
export class CustomerdetailModule {}
