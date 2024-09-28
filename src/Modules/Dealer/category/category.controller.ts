import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from '../../../dtos/create-category.dto';
import { UpdateCategoryDto } from '../../../dtos/update-category.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { Role } from '../../../enum/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from 'src/Guards/roles.guard';

@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN)
@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(@Req() req:any,@Res() res:any) {
    const result = await this.categoryService.findAll();
    if(result){return res.status(HttpStatus.OK).json(result)}
    else{return res.status(HttpStatus.NOT_FOUND)}
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Req() req:any,@Res() res:any) {
    const result= await this.categoryService.findOne(+id);
    if(result){return res.status(HttpStatus.OK).json(result)}
    else{return res.status(HttpStatus.NOT_FOUND)}
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto,@Req() req:any,@Res() res:any) {
    const result = await this.categoryService.update(+id, updateCategoryDto);
    if(result){return res.status(HttpStatus.OK).json(result)}
    else{return res.status(HttpStatus.NOT_FOUND)}
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Req() req:any,@Res() res:any) {
    const result = await this.categoryService.remove(+id);
    if(result){return res.status(HttpStatus.OK).json(result)}
    else{return res.status(HttpStatus.NOT_FOUND)}
  }
}
