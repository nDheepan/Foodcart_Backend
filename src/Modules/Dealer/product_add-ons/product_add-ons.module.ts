import { Module } from '@nestjs/common';
import { ProductAddOnsService } from './product_add-ons.service';
import { ProductAddOnsController } from './product_add-ons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAddOn } from 'src/entities/product_add-on.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductAddOn])],
  controllers: [ProductAddOnsController],
  providers: [ProductAddOnsService],
  exports:[ProductAddOnsService]
})
export class ProductAddOnsModule {}
