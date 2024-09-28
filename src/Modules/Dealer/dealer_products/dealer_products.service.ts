import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateDealerProductDto } from '../../../dtos/create-dealer_product.dto';
import { UpdateDealerProductDto } from '../../../dtos/update-dealer_product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import DealerMenu from '../../../entities/dealer_product.entity';
import { CreateCategoryDto } from '../../../dtos/create-category.dto';
import { CategoryService } from '../category/category.service';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path'
import sharp from 'sharp';
import { UpdateCategoryDto } from 'src/dtos/update-category.dto';
import { ProductAddOn } from 'src/entities/product_add-on.entity';
import { error } from 'console';
import { ProductsIngredientsService } from '../products_ingredients/products_ingredients.service';
import { ProductTagsService } from '../product_tags/product_tags.service';
import { ProductAddOnsService } from '../product_add-ons/product_add-ons.service';
@Injectable()
export class DealerProductsService {
constructor(
@InjectRepository(DealerMenu)
private productRepository :Repository<DealerMenu>,

private productaddOnService : ProductAddOnsService,
private categoryService : CategoryService,
private ingredientService : ProductsIngredientsService,
private tagService :ProductTagsService
){}

  async create(createDealerProductDto: CreateDealerProductDto) {

    const product = await this.productRepository.save(createDealerProductDto);
    const id = product.id;
    const productdet= await this.productRepository.findOne({where:{id:id},relations:['addons','ingredient','foodtag','customization']});
let addOn,ingredient,tag,customization;
      if(!productdet){throw new Error('relation not found')}
      else {
        if(createDealerProductDto.addonIds){
        addOn = await this.productaddOnService.findbyids(createDealerProductDto.addonIds);
        }else{
          addOn = null;
        }
        if(createDealerProductDto.ingredientIds){ ingredient = await this.ingredientService.findbyids(createDealerProductDto.ingredientIds);
        }else{
          ingredient = null;
        }
        if(createDealerProductDto.tagIds){ tag = await this.tagService.findbyids(createDealerProductDto.tagIds)
        }else{
          tag = null;
        }
      if(createDealerProductDto.customizationIds){ customization = await this.tagService.findbyids(createDealerProductDto.customizationIds)
      }else{
        customization = null;
      }

      
          product.addons = addOn;
          product.ingredient = ingredient;
          product.foodtag = tag;
          product.customization = customization;

          const result = await this.productRepository.save(product);
          if(!result){ throw new Error("Not found")}
          else{
            return {message:"data added and retrived successfully",id:result.id};
          }
        
      }
      
      
    }

  async createCategory(itemid:any,createCategoryDto:CreateCategoryDto){
    createCategoryDto.dealermenu = itemid;
    const category = await this.categoryService.create(createCategoryDto)
    if(category){
      return category;
    }
    else{
      throw new InternalServerErrorException();
    }

  }
  
  async findAll(id:number) {
  const result = await this.productRepository.createQueryBuilder("product")
                  .where("product.dealer = :id",{id:id})
                  .leftJoin("product.dealer","dealer")
                  .leftJoin("product.category","category")
                  .leftJoin("product.addons","addons")
                  .leftJoin("product.ingredient","ingredient")
                  .leftJoin("product.foodtag","foodtag")
                  .leftJoin("product.customization","customization")
                  .select(["product.id","product.name","category.id","category.cuisine","category.type","category.category",
                  "category.preference","product.price","product.is_available","product.images",
                  "product.ratings","addons.id","addons.name","addons.price","ingredient.id","ingredient.name",
                  "foodtag.id","foodtag.name","customization.id","customization.name","customization.price"
                ]) 
                  .getRawMany();
                result.forEach(row => {
                if(row.rating == null){
                  row.rating = "New";
                }
                return {
                product:result,
                }              
                });             
          if(result){
          return {product:result}
          }
          else{
          throw new InternalServerErrorException("products not found")
          }
                }

              

 async findOne(id: number,dealerid:number) {
   
  const queryBuilder = await this.productRepository.createQueryBuilder("product");
    const result = await queryBuilder
                   .where("product.dealer = :dealerid",{dealerid:dealerid})
                   .where("product.id = :id",{id:id})
                   .leftJoin("product.dealer","dealer")
                   .leftJoin("product.category","category")
                   .leftJoin("product.addons","addons")
                   .leftJoin("product.ingredient","ingredient")
                   .leftJoin("product.foodtag","foodtag")
                   .leftJoin("product.customization","customization")
                   .select(["product.id","product.name","category.id","category.cuisine","category.type","category.category",
                   "category.preference","product.price","product.is_available","product.images",
                   "product.ratings","addons.id","addons.name","addons.price","ingredient.id","ingredient.name",
                   "foodtag.id","foodtag.name","customization.id","customization.name","customization.price"
                 ]) 
                   .getRawOne();
                   if(!result){
                    throw new UnauthorizedException("product not found")
                   }
                   else{
                    if(result.rating == null){
                      result.rating = "New";
                    }
                    return {
                    product:result,
                    }
                   }
    
  }

   async update(id: number, updateDealerProductDto: UpdateDealerProductDto) {
    const product = await this.productRepository.createQueryBuilder("product")
                    .where("product.id = :id ",{id:id})
                    .getOne();
    fs.unlink(product.images ,(err)=>{
      if(err){
      if(err.code === 'ENOENT'){
        console.log("image file does not exist")
      }
      else{
        throw err;
      }}
      else{
        console.log('image file deleted');
      }
    });
    fs.unlink(product.shorts ,(err)=>{
      if(err){
      if(err.code === 'ENOENT'){
        console.log("image file does not exist")
      }
      else{
        throw err;
      }}
      else{
        console.log('shorts file deleted');
      }
    });


    Object.assign(product,updateDealerProductDto);
    const result = await this.productRepository.save(product);
    const addon = await this.productaddOnService.findbyids(updateDealerProductDto.addonIds);
      const ingredient = await this.ingredientService.findbyids(updateDealerProductDto.ingredientIds);
      const tag = await this.tagService.findbyids(updateDealerProductDto.tagIds);
      if(!addon.length){
        throw new Error('No addons found with the provided IDs');
      }
      else{
        result.addons = addon;
        result.ingredient = ingredient;
        result.foodtag = tag;
    await this.productRepository.save(result);
    const queryBuilder = await this.productRepository.createQueryBuilder("product");
    const result1 = await queryBuilder
                    .where("product.id = :id",{id:id})
                    .leftJoin("product.category","category")
                    .select("product.id","id")
                    .addSelect("category.id","categoryid")
                    .getRawOne();
      if(result){
      return {productid : result1.id,categoryid : result1.categoryid};
    }
    else{
      throw new InternalServerErrorException()
    }

  }
}

 async  remove(id: number) 
 {


    const product = await this.productRepository.findOne({where:{id:id}})
   
    if(!product){throw new InternalServerErrorException("product not found")}
    else{
      await this.productRepository.remove(product);
      fs.unlink(product.images ,(err)=>{
        if(err){
        if(err.code === 'ENOENT'){
          console.log("image file does not exist")
        }
        else{
          throw err;
        }}
        else{
          console.log('image file deleted');
        }
      });

      fs.unlink(product.shorts ,(err)=>{
        if(err){
        if(err.code === 'ENOENT'){
          console.log("video file does not exist")
        }
        else{
          throw err;
        }}
        else{
          console.log('video file deleted');
        }
      });
      const queryBuilder = await this.productRepository.createQueryBuilder("product");
    const result = await queryBuilder
                    .where("product.id = :id",{id:id})
                    .leftJoin("product.category","category")
                    .select("product.id","id")
                    .addSelect("category.id","categoryid")
                    .getRawOne();
      return {message:`product ${result.id}deleted successfully`,categoryid:result.categoryid};

    }
  }

  async updateOne(id:number,dealerProductsDto:CreateDealerProductDto)
  {
    const result =await this.productRepository.update(id,dealerProductsDto);
    if(result.affected >0){
      return result;
    }
    else{
      throw new BadRequestException();
    }
  }

  async getOne(id:number)
  {
    const product = this.productRepository.findOne({where:{id:id}})
    if(product){throw new BadRequestException();}
    else{
      return product;
    }
  }
  

  async updateRating(id : number,rating : any)
  {
    const result = await this.productRepository.update(id,{ratings:rating});
        if(result){return result;}
        else{throw new BadRequestException()}
  }

  

  async Categoryremove(id:number){{
    const result = await  this.categoryService.remove(id)
         if(result){return result}
         else{throw new BadRequestException()}   

  }
  }
  async getAll(){
    const result =  await this.productRepository.find({relations:['dealer']})
    if(result){return result}
    else{throw new BadRequestException()}
  }



}

