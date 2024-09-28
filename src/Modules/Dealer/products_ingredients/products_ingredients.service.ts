import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProductsIngredientDto } from '../../../dtos/create-products_ingredient.dto';
import { UpdateProductsIngredientDto } from '../../../dtos/update-products_ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsIngredient } from 'src/entities/products_ingredient.entity';
import { ProductTag } from 'src/entities/product_tag.entity';
import { Repository } from 'typeorm';
import { UpdateProductTagDto } from 'src/dtos/update-product_tag.dto';

@Injectable()
export class ProductsIngredientsService {
  constructor( @InjectRepository(ProductsIngredient)
  private readonly ingredientRepo :Repository<ProductsIngredient>){}
  async create(createProductIngredientDto: CreateProductsIngredientDto) {
    const result = await this.ingredientRepo.save(createProductIngredientDto);
    if(!result){throw new UnauthorizedException()}
    else{
    return result;
    }
  }

  async findAll(id:number) {
    const querybuilder = await this.ingredientRepo.createQueryBuilder("ingredient")
    const result = await querybuilder 
                   .where("ingredient.dealer = :id",{id : id})
                   .getMany()
    if(!result){throw new UnauthorizedException()}
    else{
    return result;
    }
  }

  async findOne(id: number) {
    const querybuilder = await this.ingredientRepo.createQueryBuilder("ingredient")
    const result = await querybuilder 
                  .where("ingredient.id = :id",{id : id})
                  .getOne()
    if(!result){throw new UnauthorizedException()}
    else{
    return result;
    }  
    }

    async findbyids(ids:number[]){
      const result = await this.ingredientRepo.findByIds(ids);
      if(!result){throw new Error("not found")}
      else{
        return result;
      }
    }

    async update(id: number, updateProductTagDto: UpdateProductTagDto) {
      const querybuilder = await this.ingredientRepo.createQueryBuilder("ingredient")
      const result = await querybuilder 
                     .where("ingredient.id = :id",{id : id})
                     .update()
                     .set(updateProductTagDto)
                     .execute();
      if(!result){throw new UnauthorizedException()}
      else{
      return result;
      }  }

      async remove(id: number) {
        const querybuilder = await this.ingredientRepo.createQueryBuilder("ingredient")
        const result = await querybuilder 
                       .where("ingredient.id = :id",{id : id})
                       .delete()
                       .execute();
        if(!result){throw new UnauthorizedException()}
        else{
        return result;
        }  }
}
