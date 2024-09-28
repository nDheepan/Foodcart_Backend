import { Injectable, InternalServerErrorException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateProductAddOnDto } from '../../../dtos/create-product_add-on.dto';
import { UpdateProductAddOnDto } from '../../../dtos/update-product_add-on.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAddOn } from 'src/entities/product_add-on.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProductAddOnsService {
  constructor(@InjectRepository(ProductAddOn)
    private readonly addOnrepo:Repository<ProductAddOn>
    ){}
  async create(createProductAddOnDto: CreateProductAddOnDto,) {
    const result = await this.addOnrepo.save(createProductAddOnDto);
    if(result){
      return result;
    }
    else{
      throw new InternalServerErrorException()
    }
  }

  async findAll(id:number) {

    const querybuilder = await this.addOnrepo.createQueryBuilder("addons")
    const result = await querybuilder
                   .where("addons.dealer = :id",{id:id})
                   .getMany();
                   if(!result){throw new UnauthorizedException()}
                   else{
                   return result;
                   }  }

  async findOne(id: number) {
    const querybuilder = await this.addOnrepo.createQueryBuilder("addon")
    const result = await querybuilder
                   .where("addon.id = :id",{id:id})
                   .getOne();
    return result;   

  }

  async findbyids(ids:number[]){
    const result = await this.addOnrepo.findByIds(ids);
    if(!result){throw new Error("not found")}
    else{
      return result;
    }
  }

  async update(id: string, updateProductAddOnDto: UpdateProductAddOnDto) {
    const querybuilder = await this.addOnrepo.createQueryBuilder("addon")
    const result = await querybuilder
                  .where("addon.id = :id",{id:id})
                  .update()
                  .set(updateProductAddOnDto)
                  .execute();
  return result;     
  }

  async remove(id: string) {
    const querybuilder = await this.addOnrepo.createQueryBuilder("addon")
    const result = await querybuilder
                  .where("addon.id = :id",{id:id})
                  .delete()
                  .execute();
    if(result){
      return result;
    }
    else{
      throw new InternalServerErrorException();
    }
                }
}
