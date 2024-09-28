import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Dealer_Entity from 'src/entities/dealer_detail.entity';
import DealerMenu from 'src/entities/dealer_product.entity';
import {Brackets, Repository } from 'typeorm';

@Injectable()
export class CustomerfilterService {
    constructor(
        @InjectRepository(Dealer_Entity)
           private dealerRepository: Repository<Dealer_Entity>,   
        @InjectRepository(DealerMenu)
           private dealerproductRepository:Repository<DealerMenu>   
    ){}
    //restaurant type and category(home,hotel,bakery & veg,non-veg,all)
      async findrestaurants(type:string,category:string) {     
        const queryBuilder = this.dealerRepository.createQueryBuilder('dealer');
        let restaurants;
        if ( category.toLowerCase() === 'Veg') {
            restaurants = await queryBuilder
                .select()
                .where('dealer.restaurant_type ILIKE :restaurant_type', { restaurant_type: `%${type}%` })
                .andWhere('dealer.restaurant_category ILIKE :restaurant_category', { restaurant_category: `${category.toLowerCase()}%`})
                .orderBy( 'dealer.restaurant_name', 'ASC')
                .select(['dealer.restaurant_name','dealer.restaurant_type','dealer.restaurant_category','dealer.restaurant_address',
                          'dealer.opens_at','dealer.closes_at','dealer.days_available','dealer.is_active','dealer.images',
                          'dealer.cuisine','dealer.dinning','dealer.delivery','dealer.ratings'])
                .getMany();
        } 
        else if(category.toLowerCase() !='Veg') {
            restaurants = await queryBuilder
                .select()
                .where('dealer.restaurant_type ILIKE :restaurant_type', { restaurant_type: `%${type}%` })
                .andWhere('dealer.restaurant_category ILIKE :restaurant_category', { restaurant_category: `${category.toLowerCase()}%` })
                .orderBy('dealer.restaurant_name', 'ASC')
                .select(['dealer.restaurant_name','dealer.restaurant_type','dealer.restaurant_category','dealer.restaurant_address',
                         'dealer.opens_at','dealer.closes_at','dealer.days_available','dealer.is_active','dealer.images',
                         'dealer.cuisine','dealer.dinning','dealer.delivery','dealer.ratings'])
                .getMany();
        }
        //others or all 
        else{
            restaurants = await queryBuilder
            .select()
            .where('dealer.restaurant_type ILIKE :restaurant_type', { restaurant_type: `${type}%` })
            .orderBy( 'dealer.restaurant_name', 'ASC')
            .select(['dealer.restaurant_name','dealer.restaurant_type','dealer. restaurant_category','dealer.restaurant_address',
                     'dealer.opens_at','dealer.closes_at','dealer.days_available','dealer.is_active','dealer.images',
                     'dealer.cuisine','dealer.dinning','dealer.delivery','dealer.ratings'])
            .getMany();
        }
        return restaurants;
    }
   // product category
       async findproducts(category:string,name:string){
        const items =await this.dealerproductRepository.createQueryBuilder('product')
           .leftJoinAndSelect('product.dealer','dealer')
           .leftJoinAndSelect('product.category','category')
           .where('dealer.restaurant_name ILIKE :restaurant_name',{restaurant_name:`${name}%`})
           .andWhere(':category = ANY(category.category)', { category })
           .select(['dealer.restaurant_name','dealer.restaurant_address','dealer.images','dealer.ratings',
                    'product.name','product.price','product.images','product.is_available','product.desc','product.shorts',
                    'product.ratings','category.category'])
           .getMany()
          if(category.toLowerCase() === 'veg'){
             return items 
          }
          else if(category.toLowerCase() === 'nonveg'){
              return items 
          }
          else{
             throw new NotFoundException()
          }
       }  

    //restaurant cuisine
    async findcuisine( cuisine:string){
        const items=await this.dealerRepository.createQueryBuilder('dealer')
        .where('dealer. cuisine ILIKE :cuisine',{ cuisine:`${ cuisine}%`})
        .select(['dealer.restaurant_name','dealer.restaurant_type','dealer. restaurant_category','dealer.restaurant_address',
                 'dealer.opens_at','dealer.closes_at','dealer.days_available','dealer.is_active','dealer.images',
                 'dealer.cuisine','dealer.dinning','dealer.delivery','dealer.ratings'])
        .getMany()
        if(cuisine.toLowerCase() === 'northindian'){
            return items 
          }
          else if(cuisine.toLowerCase() === 'southindian'){
            return items 
          }
          else if(cuisine.toLowerCase() === 'srilankan'){
            return items 
          }
          else if(cuisine.toLowerCase() === 'chinese'){
            return items  
          }
          else if(cuisine.toLowerCase() === 'traditional'){
            return items 
          }
          else {
             throw new NotFoundException() 
          }   
    }  

   //find product cuisine for particular restaurant 
  //cuisine 
    async findproductbycuisine(name:string,cuisine:string){
        const items=await this.dealerproductRepository.createQueryBuilder('product')
       .leftJoinAndSelect('product.dealer','dealer')
       .leftJoinAndSelect('product.category','category')
       .where('dealer.restaurant_name ILIKE :restaurant_name',{restaurant_name:`${name}%`})
       .andWhere('category.cuisine::text ILIKE :cuisine', { cuisine: `%${cuisine.toLowerCase()}%`})
       .select(['dealer.restaurant_name','dealer.restaurant_address','dealer.images','dealer.ratings',
             'product.name','product.price','product.images','product.ratings','category.cuisine',])
       .getMany()
         if(cuisine.toLowerCase() === 'northindian'){
            return items
         }
         else if(cuisine.toLowerCase() === 'southindian'){
            return items
         }
         else if(cuisine.toLowerCase() === 'srilankan'){
            return items
         }
         else if(cuisine.toLowerCase() === 'chinese'){
            return items
         }
         else if(cuisine.toLowerCase() === 'traditional'){
            return items 
         }
         else {
            throw new NotFoundException() 
         }   
    }
 
     //meal type  in the reataurant
    async findproductbymealtype(name:string,type:string){
        const products=await this.dealerproductRepository.createQueryBuilder('product')
        .leftJoinAndSelect('product.dealer','dealer')
        .leftJoinAndSelect('product.category','category')
        .where('dealer.restaurant_name ILIKE :restaurant_name',{restaurant_name:`${name}%`})
        .andWhere('category.meal_type::text ILIKE :meal_type', { meal_type: `%${type.toLowerCase()}%`})
        .select(['dealer.restaurant_name','dealer.restaurant_address','dealer.images','dealer.ratings',
                 'product.name','product.price','product.images','product.ratings','category.meal_type'])
        .getMany()
        if(type.toLowerCase() === 'breakfast'){
            return products; 
        }
        else if(type.toLowerCase() === 'lunch'){
            return products; 
        }
        else if(type.toLowerCase() === 'evening'){
            return products; 
        }
        else if(type.toLowerCase() === 'dinner'){
            return products; 
        }
        else{
            throw new NotFoundException()
        } 
    }     

    //ratings of restauarant
    async findrestaurantbyrating() {
        const restaurant=await this.dealerRepository.createQueryBuilder('dealer')
          .select()
          .where('dealer.ratings >= :ratings',{ratings:4.0})
          .orderBy('dealer.ratings','DESC')
          .select(['dealer.restaurant_name','dealer.restaurant_type','dealer. restaurant_category','dealer.restaurant_address',
          'dealer.opens_at','dealer.closes_at','dealer.days_available','dealer.is_active','dealer.images',
          'dealer.cuisine','dealer.dinning','dealer.delivery','dealer.ratings'])
          .getMany()
        return restaurant
    }  

    //product by low to high price 
        async finditembylowprice(name:string){
            const products=await this.dealerproductRepository.createQueryBuilder('product')
                .leftJoinAndSelect('product.dealer','dealer')
                .where('dealer.restaurant_name = :restaurant_name',{restaurant_name: name})
                .orderBy('product.price','ASC')
                .select(['dealer.restaurant_name','product.name','product.price','product.images'])
                .getMany()
            return products    
        }       

    //product by high to low price
        async finditembyhighprice(name:string){
            const products=await this.dealerproductRepository.createQueryBuilder('product')
                .leftJoinAndSelect('product.dealer','dealer')
                .where('dealer.restaurant_name = :restaurant_name',{restaurant_name:name})
                .orderBy('product.price','DESC')
                .select(['dealer.restaurant_name','product.name','product.price','product.images'])
                .getMany()
            return products    
        }

    //product by ratings
        async finditembyratings(name:string){
            const products=await this.dealerproductRepository.createQueryBuilder('product')
                .leftJoinAndSelect('product.dealer','dealer')
                .where('dealer.restaurant_name = :restaurant_name',{restaurant_name:name})
                .andWhere('product.ratings >= :ratings',{ratings:4.0})
                .orderBy('product.ratings','DESC')
                .select(['dealer.restaurant_name','product.name','product.images','product.price','product.ratings'])
                .getMany()
            return products     
        }   
        
    /*//customization
      async findcustomization(name:string,custom:string){
          const products=await this.dealerproductRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.customization','custom')
            .leftJoinAndSelect('product.dealer','dealer')
            .where('product.name ILIKE :name',{name: `${name}%`})
            .andWhere('custom.name ILIKE :customname',{customname:`${custom.toLowerCase()}%`})
            .select(['dealer.restaurant_name','product.name','product.images','product.price','custom.name','custom.price'])
            .getMany()
          return products  
      }
    
    //product tag
       async findproducttags(name:string,tag:string){
         const products=await this.dealerproductRepository.createQueryBuilder('product')
          .leftJoinAndSelect('product.foodtag','foodtag')
          .leftJoinAndSelect('product.dealer','dealer')
          .where('product.name ILIKE :name',{name: `${name}%`})
          .andWhere('foodtag.name ILIKE :tagname',{tagname : `${tag.toLowerCase()}%`})
          .select(['product.name','product.images','product.price','foodtag.name'])
          .getMany()
        return products  
       }  */
       
    //search bar
    async findBySearch(param: string) {
        const result = await this.dealerRepository.createQueryBuilder("dealer")
          .leftJoinAndSelect('dealer.product','product')
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.customization','customization')
          .leftJoinAndSelect('product.foodtag','foodtag')
          .andWhere(
            new Brackets(qb => {
              qb.where('dealer.restaurant_name ILIKE :param',{param: `${param}%`})
                .orWhere('dealer.restaurant_type ILIKE :param',{param: `${param}%`})
                .orWhere('product.name ILIKE :param', { param: `${param}%` })
                .orWhere('category.type ILIKE :param',{param: `${param}%`})
                .orWhere('category.meal_type::text ILIKE :param', { param: `%${param}%`})
                .orWhere('category.category::text ILIKE :param',{param: `%${param}%`})
                .orWhere('category.cuisine::text ILIKE :param',{param: `%${param}%`}) 
                .orWhere('customization.name ILIKE :param',{param: `${param}%`})
                .orWhere('foodtag.name ILIKE :param',{param: `${param}%`})
            })
          )
          .getRawMany();
        return result;  

}
}