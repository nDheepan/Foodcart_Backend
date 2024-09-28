import { PartialType } from '@nestjs/mapped-types';
import { CreateManageOutletDto } from './create-manage-outlet.dto';

export class UpdateManageOutletDto extends PartialType(CreateManageOutletDto) {}
