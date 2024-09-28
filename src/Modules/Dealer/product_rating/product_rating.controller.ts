import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductRatingService } from './product_rating.service';
import { createProductRatingDto } from '../../../dtos/create-product_rating.dto';
import { UpdateProductRatingDto } from '../../../dtos/update-product_rating.dto';

@Controller()
export class ProductRatingController {
  constructor(private readonly productRatingService: ProductRatingService) {}

  @Post()
  create(@Param(":ratingid") ratingid:any,@Body() createProductRatingDto: createProductRatingDto) {
    createProductRatingDto.rating = ratingid;
    return this.productRatingService.create(createProductRatingDto);
  }

  @Get()
  findAll() {
    return this.productRatingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productRatingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductRatingDto: UpdateProductRatingDto) {
    return this.productRatingService.update(+id, updateProductRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productRatingService.remove(+id);
  }
}
