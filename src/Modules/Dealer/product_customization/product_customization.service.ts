import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProductCustomizationDto } from '../../../dtos/create-product_customization.dto';
import { UpdateProductCustomizationDto } from '../../../dtos/update-product_customization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCustomization } from 'src/entities/product_customization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCustomizationService {
  constructor(@InjectRepository(ProductCustomization)
  private readonly customizationRepo : Repository<ProductCustomization>
  ){}
  async create(createProductCustomizationDto: CreateProductCustomizationDto) {
    return this.customizationRepo.save(createProductCustomizationDto);
  }

  async findAll(id:number) {

    const result = await this.customizationRepo
                  .createQueryBuilder("customization")
                  .where("customization.dealer = :id",{id:id})
                  .getMany();
    if(!result){throw new UnauthorizedException("result not found");}
    else{
    return result;
    }
  
  }

  async findOne(id: number) {
    const result = await this.customizationRepo
                  .createQueryBuilder("customization")
                  .where("customization.id = :id",{id:id})
                  .getOne();
      if(!result){throw new UnauthorizedException("result not found");}
      else{
      return result;
      }  }

  async update(id: number, updateProductCustomizationDto: UpdateProductCustomizationDto) {
    return this.customizationRepo.update(id,updateProductCustomizationDto);

  }

 async  remove(id: number) {
 const result = await this.customizationRepo
                .createQueryBuilder("customization")
                .where("customization.id = :id",{id:id})
                .getOne();
      if(!result){throw new UnauthorizedException("result not found");}
      else{
      return this.customizationRepo.remove(result);
      }  }
}
