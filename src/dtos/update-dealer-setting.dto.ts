import { PartialType } from '@nestjs/mapped-types';
import { CreateDealerSettingDto } from './create-dealer-setting.dto';

export class UpdateDealerSettingDto extends PartialType(CreateDealerSettingDto) {}
