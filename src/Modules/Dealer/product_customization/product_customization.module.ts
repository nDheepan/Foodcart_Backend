import { Module } from '@nestjs/common';
import { ProductCustomizationService } from './product_customization.service';
import { ProductCustomizationController } from './product_customization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCustomization } from 'src/entities/product_customization.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductCustomization])],
  controllers: [ProductCustomizationController],
  providers: [ProductCustomizationService],
})
export class ProductCustomizationModule {}
