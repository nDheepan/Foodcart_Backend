import { PartialType } from '@nestjs/mapped-types';
import { CreateAgentOrdernotificationDto } from './create-agent_ordernotification.dto';

export class UpdateAgentOrdernotificationDto extends PartialType(CreateAgentOrdernotificationDto) {}
