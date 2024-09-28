import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProductTagDto } from '../../../dtos/create-product_tag.dto';
import { UpdateProductTagDto } from '../../../dtos/update-product_tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTag } from 'src/entities/product_tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductTagsService {
 constructor( @InjectRepository(ProductTag)
  private readonly tagRepo :Repository<ProductTag>){}
  async create(createProductTagDto: CreateProductTagDto) {
    const result = await this.tagRepo.save(createProductTagDto);
      if(!result){throw new UnauthorizedException()}
      else{
      return result;
      }
  }

  async findAll(id:number) {
    const querybuilder = await this.tagRepo.createQueryBuilder("foodtag")
    const result = await querybuilder 
                   .where("foodtag.dealer = :id",{id : id})
                   .getMany()
      if(!result){throw new UnauthorizedException()}
      else{
      return result;
      }
  }

  async findOne(id: number) {
  const querybuilder = await this.tagRepo.createQueryBuilder("foodtag")
  const result = await querybuilder 
                .where("foodtag.id = :id",{id : id})
                .getOne()
      if(!result){throw new UnauthorizedException()}
      else{
      return result;
      }  
  }
  async findbyids(ids:number[]){
    const result = await this.tagRepo.findByIds(ids);
        if(!result){throw new Error("not found")}
        else{
          return result;
        }
  }

  async update(id: number, updateProductTagDto: UpdateProductTagDto) {
    const result = await this.tagRepo.update(id,updateProductTagDto)
                   
    if(!result){throw new UnauthorizedException()}
    else{
    return result;
    }  }

  async remove(id: number) {
    const querybuilder = await this.tagRepo.createQueryBuilder("foodtag")
    const result = await querybuilder 
                   .where("foodtag.id = :id",{id : id})
                   .delete()
                   .execute();
    if(!result){throw new UnauthorizedException()}
    else{
    return result;
    } 
   }
}
