import { Module } from '@nestjs/common';
import { DealerProductsfilterService } from './dealer_productsfilter.service';
import { DealerProductsfilterController } from './dealer_productsfilter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import DealerMenu from 'src/entities/dealer_product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DealerMenu])],
  controllers: [DealerProductsfilterController],
  providers: [DealerProductsfilterService],
})
export class DealerProductsfilterModule {}
