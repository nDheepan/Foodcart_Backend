import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromoOffersService } from './promo-offers.service';
import { CreatePromoOfferDto } from '../../../dtos/create-promo-offer.dto';
import { UpdatePromoOfferDto } from '../../../dtos/update-promo-offer.dto';

@Controller()
export class PromoOffersController {
  constructor(private readonly promoOffersService: PromoOffersService) {}

  @Post()
  create(@Body('dealerid') dealerid:any,@Body() createPromoOfferDto: CreatePromoOfferDto) {
    createPromoOfferDto.dealer = dealerid;
    return this.promoOffersService.create(createPromoOfferDto);
  }

  @Get()
  findAll() { 
    return this.promoOffersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promoOffersService.findOne(+id);
  }

  @Patch('update')
  update(@Body('id') id:number , @Body() updatePromoOfferDto: UpdatePromoOfferDto) {
    return this.promoOffersService.update(+id, updatePromoOfferDto);
  }

  @Delete('remove')
  remove(@Body('id') id:number ) {
    return this.promoOffersService.remove(+id);
  }
}
