import { Module } from '@nestjs/common';
import { ProductTagsService } from './product_tags.service';
import { ProductTagsController } from './product_tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTag } from 'src/entities/product_tag.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductTag])],
  controllers: [ProductTagsController],
  providers: [ProductTagsService],
  exports:[ProductTagsService]
})
export class ProductTagsModule {}
