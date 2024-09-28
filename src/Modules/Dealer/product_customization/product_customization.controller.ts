import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, BadRequestException, HttpStatus, UseGuards } from '@nestjs/common';
import { ProductCustomizationService } from './product_customization.service';
import { CreateProductCustomizationDto } from '../../../dtos/create-product_customization.dto';
import { UpdateProductCustomizationDto } from '../../../dtos/update-product_customization.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';

@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class ProductCustomizationController {
  constructor(private readonly productCustomizationService: ProductCustomizationService) {}

  @Post()
 async  create(@Body() createProductCustomizationDto: CreateProductCustomizationDto,@Req() req : any,@Res() res:any) {
     createProductCustomizationDto.dealer = req.user.dealerid;;

     const result = await this.productCustomizationService.create(createProductCustomizationDto);
     if(!result){
      return res.status(HttpStatus.NOT_FOUND).json({message:"result not found"})
     }
     else{
      return res.status(HttpStatus.OK).json({message:"data added successfully",result})
     }
  }

  @Get()
  async findAll(@Req() req : any,@Res() res:any) {
    const dealerid = req.user.dealerid ;
    const result = await  this.productCustomizationService.findAll(dealerid);
    if(!result){
      return res.status(HttpStatus.NOT_FOUND).json({message:"result not found"})
     }
     else{
      return res.status(HttpStatus.OK).json({message:"data found successfully",result})
     }
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Req() req : any,@Res() res:any) {
    const result = await this.productCustomizationService.findOne(+id);
        if(!result){
          return res.status(HttpStatus.NOT_FOUND).json({message:"data not found"})
        }
        else{
          return res.status(HttpStatus.OK).json({message:"data found successfully",result})
        }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductCustomizationDto: UpdateProductCustomizationDto,@Req() req : any,@Res() res:any) {
    const result = await this.productCustomizationService.update(+id, updateProductCustomizationDto);
        if(!result){
          return res.status(HttpStatus.NOT_FOUND).json({message:"data not found"})
        }
        else{
          return res.status(HttpStatus.OK).json({message:"data updated successfully"})
        }
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Req() req : any,@Res() res:any) {
    const result= await  this.productCustomizationService.remove(+id);
        if(!result){
          return res.status(HttpStatus.NOT_FOUND).json({message:"data not found"})
        }
        else{
          return res.status(HttpStatus.OK).json({message:"data deleted successfully"})
        }
  }
}
