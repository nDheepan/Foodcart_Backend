import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminInfoDto } from './create-admin_info.dto';

export class UpdateAdminInfoDto extends PartialType(CreateAdminInfoDto) {}
