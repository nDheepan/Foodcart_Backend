import { PartialType } from '@nestjs/mapped-types';
import { createOrderHistoryDto } from './createOrderHistoryDto.ts';

export class UpdateDealerManagestaffDto extends PartialType(createOrderHistoryDto) {}
