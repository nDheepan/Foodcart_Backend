import { Controller, Get,Request, Post, Body, Patch, Param, Delete, UseGuards, Res, Req, HttpStatus } from '@nestjs/common';
import { DealerToAdminComplientsService } from './dealer_to-admin-complients.service';
import { CreateDealerToAdminComplientDto } from '../../../dtos/create-dealer_to-admin-complient.dto';
import { UpdateDealerToAdminComplientDto } from '../../../dtos/update-dealer_to-admin-complient.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Role } from '../../../enum/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(jwtGuard)
@Controller()
export class DealerToAdminComplientsController {

  constructor(private readonly dealerToAdminComplientsService: DealerToAdminComplientsService) {}

  @Post('complients/:adminid')
  async create(@Req() req:any,@Res() res:any,@Param(":adminid") adminid:any,@Body() createDealerToAdminComplientDto: CreateDealerToAdminComplientDto) {

    createDealerToAdminComplientDto.dealer = req.user.dealerid;
    createDealerToAdminComplientDto.admin = adminid;
    const result =await this.dealerToAdminComplientsService.create(createDealerToAdminComplientDto);
    if(result){return res.status(HttpStatus.OK).json(result)}
    else{return res.status(HttpStatus.NOT_FOUND)}
  }

  @Get()
  async findAll(@Req() req:any,@Res() res:any) {
    const result = await this.dealerToAdminComplientsService.findAll();
    if(result){return res.status(HttpStatus.OK).json(result)}
    else{return res.status(HttpStatus.NOT_FOUND)}
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Req() req:any,@Res() res:any) {
    const result = await this.dealerToAdminComplientsService.findOne(id);
    if(result){return res.status(HttpStatus.OK).json(result)}
    else{return res.status(HttpStatus.NOT_FOUND)}
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDealerToAdminComplientDto: UpdateDealerToAdminComplientDto,@Req() req:any,@Res() res:any) {
    const result =await  this.dealerToAdminComplientsService.update(id, updateDealerToAdminComplientDto);
    if(result){return res.status(HttpStatus.OK).json(result)}
    else{return res.status(HttpStatus.NOT_FOUND)}
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Req() req:any,@Res() res:any) {
    const result = await this.dealerToAdminComplientsService.remove(id);
    if(result){return res.status(HttpStatus.OK).json(result)}
    else{return res.status(HttpStatus.NOT_FOUND)}
  }
}
