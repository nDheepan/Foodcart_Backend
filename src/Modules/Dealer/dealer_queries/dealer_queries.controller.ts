import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DealerQueriesService } from './dealer_queries.service';
import { CreateDealerQueryDto } from '../../../dtos/create-dealer_query.dto';
import { UpdateDealerQueryDto } from '../../../dtos/update-dealer_query.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { Role } from '../../../enum/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from 'src/Guards/roles.guard';
@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN)
@Controller()
export class DealerQueriesController {
  constructor(private readonly dealerQueriesService: DealerQueriesService) {}

  @Post()
  create(@Body() createDealerQueryDto: CreateDealerQueryDto) {
    return this.dealerQueriesService.create(createDealerQueryDto);
  }

  @Get()
  findAll() {
    return this.dealerQueriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealerQueriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDealerQueryDto: UpdateDealerQueryDto) {
    return this.dealerQueriesService.update(+id, updateDealerQueryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealerQueriesService.remove(+id);
  }
}
