import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsLowercase } from 'class-validator';
import Dealer_Entity from 'src/entities/dealer_detail.entity';
import DealerMenu from 'src/entities/dealer_product.entity';
import { Brackets, Repository } from 'typeorm';
import { ILike } from 'typeorm';
import { In } from 'typeorm';
@Injectable()
export class DealerProductsfilterService {


constructor(@InjectRepository(DealerMenu)
private readonly productRepo : Repository<DealerMenu>,

){}
 
async findBasedmealtype(id:number,type:string){
  let result;
  let typef = type;
  const queryBuilder = await this.productRepo.createQueryBuilder("product");
   
    if(typef === 'breakfast'){     
      result = await queryBuilder
      .where("product.dealer = :id",{id:id})
      .leftJoinAndSelect("product.category","category")
      .andWhere(":type = ANY(category.meal_type)",{type:type})
      .getRawMany();
    return result    }
    else if(typef === 'lunch'){ 
      result = await queryBuilder
      .where("product.dealer = :id",{id:id})
      .leftJoinAndSelect("product.category","category")
      .andWhere(":type = ANY(category.meal_type)",{type:type})
      .getRawMany();
    return result  }

    else if(typef === 'evening'){
      result = await queryBuilder
      .where("product.dealer = :id",{id:id})
      .leftJoinAndSelect("product.category","category")
      .andWhere(":type = ANY(category.meal_type)",{type:type})
      .getRawMany();
    return result      }
    else{
     return {message:"not found any breakfast foods"}
    }
  }

  async findBasedCuisine(id: number, cuisine: string) {
    let result;

    const queryBuilder = await this.productRepo.createQueryBuilder("product");
    if (cuisine.toLowerCase() ===  'northindian') {
        result = await queryBuilder
            .where("product.dealer = :id", { id: id })
            .leftJoinAndSelect("product.category", "category")
            .andWhere('category.cuisine::text ILIKE :cuisine', { cuisine: `%${cuisine.toLowerCase()}%` })
            .getMany();

        return result;
    }
    else if(cuisine.toLowerCase() ===  'southindian'){
      result = await queryBuilder
      .where("product.dealer = :id", { id: id })
      .leftJoinAndSelect("product.category", "category")
      .andWhere('category.cuisine::text ILIKE :cuisine', { cuisine: `%${cuisine.toLowerCase()}%` })
      .getMany();

  return result;

    }
    else if(cuisine.toLowerCase() ===  'srilankan'){
      result = await queryBuilder
      .where("product.dealer = :id", { id: id })
      .leftJoinAndSelect("product.category", "category")
      .andWhere('category.cuisine::text ILIKE :cuisine', { cuisine: `%${cuisine.toLowerCase()}%` })
      .getMany();

  return result;

    }
    else if(cuisine.toLowerCase() ===  'chinese'){
      result = await queryBuilder
      .where("product.dealer = :id", { id: id })
      .leftJoinAndSelect("product.category", "category")
      .andWhere('category.cuisine::text ILIKE :cuisine', { cuisine: `%${cuisine.toLowerCase()}%` })
      .getMany();

   return result;

    }
    else if(cuisine.toLowerCase() ===  'traditional'){
      result = await queryBuilder
      .where("product.dealer = :id", { id: id })
      .leftJoinAndSelect("product.category", "category")
      .andWhere('category.cuisine::text ILIKE :cuisine', { cuisine: `%${cuisine.toLowerCase()}%` })
      .getMany();

   return result;

    }
    else{
      throw new UnauthorizedException();
    }


}


    async findBasedCategory(id:string,category:string){
   let result:any;
    const querybuilder = await this.productRepo.createQueryBuilder("product");
   if(category.toLowerCase() === 'veg'){
  
      result = await querybuilder
      .where("product.dealer = :id", { id: id })
      .leftJoinAndSelect("product.category", "category")
      .andWhere('category.category::text ILIKE :category', { category: `%${category.toLowerCase()}%` })
      .getMany();
    return result; 
   }
   else if(category.toLowerCase() === 'nonveg'){
    result = await querybuilder
    .where("product.dealer = :id", { id: id })
    .leftJoinAndSelect("product.category", "category")
    .andWhere('category.category::text ILIKE :category', { category: `%${category.toLowerCase()}%` })
    .getMany();
  return result; 
   }
   else if(category.toLowerCase() === 'vegan'){
    result = await querybuilder
    .where("product.dealer = :id", { id: id })
    .leftJoinAndSelect("product.category", "category")
    .andWhere('category.category::text ILIKE :category', { category: `%${category.toLowerCase()}%` })
    .getMany();
  return result; 
   }
   else{

    throw new BadRequestException()
   }

    }

  async findBasedType(id:string,type:string){
      let result;
      const querybuilder = await this.productRepo.createQueryBuilder("product");
        if(type.toLowerCase() ===  'food'){
          result = await querybuilder
          .where("product.dealer = :id", { id: id })
          .leftJoinAndSelect("product.category", "category")
          .andWhere('category.type::text ILIKE :type', { type: `%${type.toLowerCase()}%` })
          .getMany();
      return result;

      }

        else if(type.toLowerCase() ===  'snacks'){
          result = await querybuilder
          .where("product.dealer = :id", { id: id })
          .leftJoinAndSelect("product.category", "category")
          .andWhere('category.type::text ILIKE :type', { type: `%${type.toLowerCase()}%` })
          .getMany();
      return result;

  }
        else if(type.toLowerCase() ===  'drinks'){
          result = await querybuilder
          .where("product.dealer = :id", { id: id })
          .leftJoinAndSelect("product.category", "category")
          .andWhere('category.type::text ILIKE :type', { type: `%${type.toLowerCase()}%` })
          .getMany();
        return result;

  }

    else{
      throw new UnauthorizedException();
    }

  }

async findBasedStock(id:number,status:boolean){

  let result;
  const querybuilder = await this.productRepo.createQueryBuilder("product")
  
   if(status ===  true){
    result = await querybuilder
    .where("product.dealer = :id", { id: id })
    .andWhere('product.is_available = :status', { status: status })
    .getMany();
  return result;
  }
  else if(status ===  false){
    result = await querybuilder
    .where("product.dealer = :id", { id: id })
    .andWhere('product.is_available = :status', { status: status })
    .getMany();
  return result;
  }
  else{
    throw new BadRequestException();
  }
}


async findBasedSearch(id: number, param: string) {
  const result = await this.productRepo.createQueryBuilder("product")
    .where("product.dealer = :id", { id: id })
    .leftJoinAndSelect("product.category", "category")
    .leftJoinAndSelect("product.addons","addons")
    .leftJoinAndSelect("product.ingredient","ingredient")
    .leftJoinAndSelect("product.foodtag","foodtag")
    .leftJoinAndSelect("product.customization","customization")
    .andWhere(
      new Brackets(qb => {
        qb.where("product.name ILIKE :param", { param: `${param}%` })
        .orWhere('category.type::text ILIKE :param', { param: `${param}%` })
        .orWhere('category.meal_type::text ILIKE :param', {param: `%${param}%` })
        .orWhere('category.category::text ILIKE :param', {param: `%${param}%` })
        .orWhere('category.cuisine::text ILIKE :param', {param:`%${param}%`})  
        .orWhere('addons.name ILIKE :param',{param:`${param}%`})  
        .orWhere('ingredient.name ILIKE :param',{param:`${param}%`})
        .orWhere('foodtag.name ILIKE :param',{param:`${param}%`})
        .orWhere('customization.name ILIKE :param',{param:`${param}%`})

      })
    )
    .getRawMany();


    

  return result;
}


  
  
}