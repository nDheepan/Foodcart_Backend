import { Injectable } from '@nestjs/common';
import { CreatePromoOfferDto } from '../../../dtos/create-promo-offer.dto';
import { UpdatePromoOfferDto } from '../../../dtos/update-promo-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PromoOffers } from '../../../entities/promo-offer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromoOffersService {
  constructor(
    @InjectRepository(PromoOffers)
    private promoRepository :Repository<PromoOffers>
    ){}
    
    async create(createPromoOfferDto: CreatePromoOfferDto) {
    return this.promoRepository.save(createPromoOfferDto);
    }

    async findAll() {
    return `This action returns all promoOffers`;
    }

    async findOne(id: number) {
    const promofindQueryBuilder= await this.promoRepository.createQueryBuilder("promo").where("promo.id= :id",{id:id}).getOne();
    return `This action returns a #${id} promoOffer`;
    }

    async update(id: number, updatePromoOfferDto: UpdatePromoOfferDto) {
    return this.promoRepository.update(id,updatePromoOfferDto)
    }

    async remove(id: number) {
    return `This action removes a #${id} promoOffer`;
    }
}
