import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus, Req } from '@nestjs/common';
import { ProductAddOnsService } from './product_add-ons.service';
import { CreateProductAddOnDto } from '../../../dtos/create-product_add-on.dto';
import { UpdateProductAddOnDto } from '../../../dtos/update-product_add-on.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Role } from 'src/enum/role.enum';
import { Response } from 'express';
@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class ProductAddOnsController {
  constructor(private readonly productAddOnsService: ProductAddOnsService) {}

  @Post()
  async create(@Body() createProductAddOnDto: CreateProductAddOnDto,@Req() req:any,@Res() res:Response) {
    createProductAddOnDto.dealer = req.user.dealerid;;
    const result =await this.productAddOnsService.create(createProductAddOnDto);
    if(result){
      return res.status(HttpStatus.OK).json({message:"records inserted successfully",result})
    }
    else{
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"records not insert"})
    }

  }

  @Get()
  async findAll(@Req() req:any,@Res() res:Response) {
    const dealerid = req.user.dealerid;
    const result = await this.productAddOnsService.findAll(dealerid);
    if(result){
      return res.status(HttpStatus.OK).json({message:"records retrieve successfully",result})
    }
    else{
      return res.status(HttpStatus.NOT_FOUND).json({message:"records not found"})
    }
  }

  @Get('one/:id')
  async findOne(@Param('id') id: number,@Res() res:Response,@Req() req:any) {
    const dealerid = req.user.dealerid;
    const result = await this.productAddOnsService.findOne(id);
    if(result){
      return res.status(HttpStatus.OK).json({message:"records retrieve successfully",result})
    }
    else{
      return res.status(HttpStatus.NOT_FOUND).json({message:"records not found"})
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductAddOnDto: UpdateProductAddOnDto,@Res() res:Response) {
    const result = await this.productAddOnsService.update(id, updateProductAddOnDto);
    if(result){
      return res.status(HttpStatus.OK).json({message:"records updated successfully",result})
    }
    else{
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"update not done"})
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Res() res:Response) {
    const result = this.productAddOnsService.remove(id);
    if(result){
      return res.status(HttpStatus.OK).json({message:"records removed successfully",result})
    }
    else{
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"records not found"})
    }
  }
}
