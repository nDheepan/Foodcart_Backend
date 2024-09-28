import { PartialType } from '@nestjs/mapped-types';
import { CreatePromoOfferDto } from './create-promo-offer.dto';

export class UpdatePromoOfferDto extends PartialType(CreatePromoOfferDto) {}
