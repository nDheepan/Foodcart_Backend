import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UnauthorizedException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ProductTagsService } from './product_tags.service';
import { CreateProductTagDto } from '../../../dtos/create-product_tag.dto';
import { UpdateProductTagDto } from '../../../dtos/update-product_tag.dto';
import { Response } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class ProductTagsController {
  constructor(private readonly productTagsService: ProductTagsService) {}

  @Post()
  async create(@Body() createProductTagDto: CreateProductTagDto,@Req() req:any,@Res() res:Response) {
      createProductTagDto.dealer = req.user.dealerid;;
      const result = await this.productTagsService.create(createProductTagDto);
    if(!result){
          throw new UnauthorizedException();
    }
    else{
        return  res.status(HttpStatus.OK).json({message:"product tags added successfully",result});
    }
  }

  @Get()
  async findAll(@Req() req:any,@Res() res:Response) {
    const dealerid = req.user.dealerid;
      const result = await this.productTagsService.findAll(dealerid);
      if(!result){throw new UnauthorizedException()}
      else{
        return  res.status(HttpStatus.OK).json({message:"product tags found successfully",result});
      }
  }

  @Get(':tagid')
  async findOne(@Param('tagid') tagid: number,@Res() res:Response) {
      const result = await this.productTagsService.findOne(+tagid);
      if(!result){throw new UnauthorizedException()}
      else{
        return  res.status(HttpStatus.OK).json({message:"product tag found successfully",result});
      }
  }

  @Patch(':tagid')
  async update(@Param('tagid') tagid: number, @Body() updateProductTagDto: UpdateProductTagDto,@Res() res:Response) {
      const result = await this.productTagsService.update(+tagid, updateProductTagDto);
      if(!result){throw new UnauthorizedException()}
      else{
        return  res.status(HttpStatus.OK).json({message:"product tag updated successfully",result});
      }
  }

  @Delete(':tagid')
  async remove(@Param('tagid') tagid: string,@Res() res:Response) {
      const result = await this.productTagsService.findOne(+tagid);
      if(!result){throw new UnauthorizedException()}
      else{
        return  res.status(HttpStatus.OK).json({message:"product tag deleted successfully",result});
      }  }
}
