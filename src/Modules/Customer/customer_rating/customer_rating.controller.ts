import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { ProductRatingService } from 'src/Modules/Dealer/product_rating/product_rating.service';
import { RatingService } from 'src/Modules/rating/rating.service';
import { createProductRatingDto } from 'src/dtos/create-product_rating.dto';
import { CreateRatingDto } from 'src/dtos/create-rating.dto';

@Controller()
export class CustomerRatingController {
    constructor(
        private ratingService:RatingService,
        private productratingService:ProductRatingService,
    ){}
    @UseGuards(jwtGuard)
    @Post()
  async create(
             @Req() req,
             @Body('dealerid') dealerid:any,
             @Body('orderid') orderid:any,
             @Body() createRatingDto: CreateRatingDto,
             @Body() productratingDto:createProductRatingDto,
             @Body('productid') productid:any
  ){
    const userid=req.user.id
    createRatingDto.user=userid;
    createRatingDto.dealer=dealerid;
   createRatingDto.order=orderid
   const dealerrating= await this.ratingService.create(createRatingDto);
   console.log(dealerrating)
      productratingDto.rating=dealerrating
      productratingDto.product=productid
      const productrating=await this.productratingService.create(productratingDto)
      console.log(productrating)
  }
  
}
