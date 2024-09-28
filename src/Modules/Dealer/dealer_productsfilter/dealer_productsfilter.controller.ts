import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { DealerProductsfilterService } from './dealer_productsfilter.service';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';


@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)@Controller()
export class DealerProductsfilterController {
  constructor(private readonly dealerProductsfilterService: DealerProductsfilterService) {}
  
  @Get('meal')
  async findrestaurants(
     @Req() req :any, 
     @Query('meal_type') meal_type:string,
  ){
    const dealerid = req.user.dealerid;
    return this.dealerProductsfilterService.findBasedmealtype(dealerid,meal_type);
  }

  @Get('cuisine')
  async findBasedCuisine(@Req() req:any,@Query('cuisine') cuisine:string){
    const dealerid = req.user.dealerid;
    return this.dealerProductsfilterService.findBasedCuisine(dealerid,cuisine);
  }


  @Get('category')
  async findBasedCategory(@Req() req:any,@Query('category') category:string){
    const dealerid = req.user.dealerid;
    return this.dealerProductsfilterService.findBasedCategory(dealerid,category);
  }

  @Get('type')
  async findBasedType(@Req() req:any,@Query('type') type:string){
    const dealerid = req.user.dealerid;
    return this.dealerProductsfilterService.findBasedType(dealerid,type);
  }

 
  
  @Get('stock')
  async findBasedStock(@Req() req:any,@Query('status') status:boolean){
    const dealerid = req.user.dealerid;
    return this.dealerProductsfilterService.findBasedStock(dealerid,status);
  }
  

  @Get('search')
  async findBasedSearch(@Req() req:any,@Query('param') param:string){
    const dealerid = req.user.dealerid;
    return this.dealerProductsfilterService.findBasedSearch(dealerid,param);

  }
  
}
