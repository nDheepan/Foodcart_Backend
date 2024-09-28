import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UnauthorizedException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ProductsIngredientsService } from './products_ingredients.service';
import { CreateProductsIngredientDto } from '../../../dtos/create-products_ingredient.dto';
import { UpdateProductsIngredientDto } from '../../../dtos/update-products_ingredient.dto';
import { Response } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class ProductsIngredientsController {
  constructor(private readonly productsIngredientsService: ProductsIngredientsService) {}

  @Post()
  async create(@Body() createProductIngredientDto: CreateProductsIngredientDto,@Req() req:any,@Res() res:Response) {
    createProductIngredientDto.dealer = req.user.dealerid;;
    const result = await this.productsIngredientsService.create(createProductIngredientDto);
   if(!result){
        throw new UnauthorizedException();
   }
   else{
       return  res.status(HttpStatus.OK).json({message:"product ingredients added successfully",result});
   }
  }

  @Get()
  async findAll(@Req() req:any,@Res() res:Response) {
  const dealerid = req.user.dealerid;
    const result = await this.productsIngredientsService.findAll(dealerid);
    if(!result){throw new UnauthorizedException()}
    else{
      return  res.status(HttpStatus.OK).json({message:"product ingredients found successfully",result});
    }
  }

  @Get(':ingredientid')
  async findOne(@Param('ingredientid') ingredientid: number,@Res() res:Response) {
    const result = await this.productsIngredientsService.findOne(+ingredientid);
    if(!result){throw new UnauthorizedException()}
    else{
      return  res.status(HttpStatus.OK).json({message:"product ingredient found successfully",result});
    }
  }

  @Patch(':ingredientid')
  async update(@Param('ingredientid') ingredientid: number, @Body() updateProductIngredientDto: UpdateProductsIngredientDto,@Res() res:Response) {
    const result = await this.productsIngredientsService.update(+ingredientid, updateProductIngredientDto);
    if(!result){throw new UnauthorizedException()}
    else{
      return  res.status(HttpStatus.OK).json({message:"product ingredient updated successfully",result});
    }
  }

  @Delete(':ingredientid')
  async remove(@Param('ingredientid') ingredientid: string,@Res() res:Response) {
    const result = await this.productsIngredientsService.findOne(+ingredientid);
    if(!result){throw new UnauthorizedException()}
    else{
      return  res.status(HttpStatus.OK).json({message:"product ingredient deleted successfully",result});
    }  }
}
