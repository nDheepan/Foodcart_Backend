import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDetailDto } from './customer-detail.dto';

export class UpdatecustomerDetailDto extends PartialType(CreateCustomerDetailDto) {}
