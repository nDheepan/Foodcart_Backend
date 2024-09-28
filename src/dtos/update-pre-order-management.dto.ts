import { PartialType } from '@nestjs/mapped-types';
import { CreatePreOrderManagementDto } from './create-pre-order-management.dto';

export class UpdatePreOrderManagementDto extends PartialType(CreatePreOrderManagementDto) {}
