import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createProductRatingDto } from '../../../dtos/create-product_rating.dto';
import { UpdateProductRatingDto } from '../../../dtos/update-product_rating.dto';
import { Repository } from 'typeorm';
import { ProductRating } from '../../../entities/product_rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DealerProductsService } from '../dealer_products/dealer_products.service';

@Injectable()
export class ProductRatingService {
  constructor(
    @InjectRepository(ProductRating)
    private productRatingRepo:Repository<ProductRating> 
    ,private readonly productservice:DealerProductsService
    ){}
 async  create(createProductRatingDto: createProductRatingDto) {
    return this.productRatingRepo.save(createProductRatingDto)

  }

  async findAll() {
    const result = await this.productRatingRepo.createQueryBuilder("product_rating")
                    .getMany();
      if(!result){throw new UnauthorizedException()}
      else{
        return result;
      }  
  }

 async  findOne(id: number) {

    const result =await  this.productRatingRepo.createQueryBuilder('product_rating')
                  .where('product_rating.id = :id', { id:id })
                  .getOne();
              
    if (!result) {
      throw new UnauthorizedException('No matching rating found');
    } else {
      return result;
    }  }

  update(id: number, updateProductRatingDto: UpdateProductRatingDto) {
    return this.productRatingRepo.update(id,updateProductRatingDto)
  }

  async remove(id: number) {

      const result = await this.productRatingRepo.createQueryBuilder('product_rating')
                    .where('product_rating.id = :id', { id:id })
                    .getOne();
    
      if (!result) {
        throw new UnauthorizedException('No matching rating found');
      } else {
        return this.productRatingRepo.remove(result);
      }  
    }


    async getRating(productid:number) {
      const queryBuilder = await this.productRatingRepo.createQueryBuilder("product_rating");
      const result = await queryBuilder
        .where("product_rating.product = :productid",{productid:productid})
        .leftJoin("product_rating.rating", "rating")
        .leftJoin("product_rating.product","product")
        .select("AVG(rating.product_star)", "avgrating")
        .getRawOne();
    
      if (!result) {
        throw new UnauthorizedException("result not found");
      } else {
        const ratingstar = parseFloat(result.avgrating).toFixed(1); 
        await this.productservice.updateRating(productid,ratingstar);
        
    
        return { rating: ratingstar };
      }
    }
      
    
    }

