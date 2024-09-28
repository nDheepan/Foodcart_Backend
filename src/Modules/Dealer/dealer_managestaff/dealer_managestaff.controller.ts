import { Controller, Get,Request, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { DealerManagestaffService } from './dealer_managestaff.service';
import { CreateDealerManagestaffDto } from '../../../dtos/create-dealer_managestaff.dto';
import { UpdateDealerManagestaffDto } from '../../../dtos/update-dealer_managestaff.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { Role } from '../../../enum/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from 'src/Guards/roles.guard';

@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN)

@Controller()
export class DealerManagestaffController {
  constructor(private readonly dealerManagestaffService: DealerManagestaffService) {}

  @Post()
  async create(@Body() createDealerManagestaffDto: CreateDealerManagestaffDto,@Req() req: any,@Res() res:any) {
    const dealerid = req.user.dealerid;
    createDealerManagestaffDto.dealer = dealerid;
    const result = await this.dealerManagestaffService.create(createDealerManagestaffDto);
          if(result ){
            res.status(HttpStatus.OK).json({message:"staff details added successfully",result})
                  }
          else{
            res.status(HttpStatus.NOT_FOUND).json({messsage:"staff  details not added "})
              }
  }

  @Get()
  async findAll(@Req() req: any,@Res() res:any) {
    const dealerid = req.user.dealerid;
    const result = await this.dealerManagestaffService.findAll(dealerid);
          if(result ){
            res.status(HttpStatus.OK).json({message:"staff's details found successfully",result})
                  }
          else{
            res.status(HttpStatus.NOT_FOUND).json({messsage:"No any staff's  details found "})
              }
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Req() req: any,@Res() res:any) {
    const result =await  this.dealerManagestaffService.findOne(+id);
          if(result ){
            res.status(HttpStatus.OK).json({message:"staff details found successfully",result})
                  }
          else{
            res.status(HttpStatus.NOT_FOUND).json({messsage:" staff  details found "})
              }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDealerManagestaffDto: UpdateDealerManagestaffDto,@Req() req: any,@Res() res:any) {
        const result =await this.dealerManagestaffService.update(+id, updateDealerManagestaffDto);
        if(result ){
          res.status(HttpStatus.OK).json({message:"staff details updated successfully",result})
                }
        else{
          res.status(HttpStatus.NOT_FOUND).json({messsage:"staff  details updated "})
            }
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Req() req: any,@Res() res:any) {
    const result = await  this.dealerManagestaffService.remove(+id);
          if(result ){
            res.status(HttpStatus.OK).json({message:"staff  removed successfully",result})
                  }
          else{
            res.status(HttpStatus.NOT_FOUND).json({messsage:" staff details not found "})
              }
  }

}
