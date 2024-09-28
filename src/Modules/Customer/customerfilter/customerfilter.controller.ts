import { Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { CustomerfilterService } from './customerfilter.service';



@Controller()
export class CustomerfilterController {
    constructor(private readonly filterService: CustomerfilterService) {}
   
  //resturant category
    @Get('category')
      async findrestaurants(
         @Query('restaurant_type') type:string,
         @Query('restaurant_category') category:string 
      ){
        return this.filterService.findrestaurants(type,category)
      }

  //category    
    @Get('products')
     async findproducts(
      @Query('restaurant_name') name:string,
     @Query('category') category:string 
     ){
        return this.filterService.findproducts(category,name)
     }
 //above two are main filters  

  //restaurant rating
    @Get('ratings')
      async findbyratings(){
         return this.filterService.findrestaurantbyrating()
      }   
  //cuisine
    @Get('cuisine')
      async findcuisine(@Query('cuisine')cuisine:string){
          return this.filterService.findcuisine(cuisine)
      } 

  //the below are filters inside restaurant      
  //products cuisine
    @Get('itemcuisine')
      async findbycuisine(
               @Query('restaurant_name') name:string,@Query('cuisine')cuisine:string){
        return this.filterService.findproductbycuisine(name,cuisine)
      }

  //low price
    @Get('lowprice')
      async findbylowprice(@Query('restaurant_name') name:string){
          return this.filterService.finditembylowprice(name)
      }

  //high price    
    @Get('highprice')
      async findbyhighprice(@Query('restaurant_name') name:string){
          return this.filterService.finditembyhighprice(name)
      }   

  //product rating
    @Get('itemrating')
      async findbyitemrating(@Query('restaurant_name') name:string){
         return this.filterService.finditembyratings(name)
      } 

   //meal_type
    @Get('meal-type')
     async findproductbymealtype(@Query('restaurant_name') name:string,@Query('meal_type') type:string){
        return this.filterService.findproductbymealtype(name,type)
     } 

   /*//custom filter
     @Get('custom')
       async findproductcustom(@Query('name') name:string,@Query('custom') custom:string){
         return this.filterService.findcustomization(name,custom)
       } 

   //tag 
     @Get('foodtag')
       async findfoodtag(@Query('name')name:string,@Query('tag')tag:string){
         return this.filterService.findproducttags(name,tag)
       }*/    

   //searc filter
   @Get('search')
   async findBasedSearch(@Query('param') param:string){
   return this.filterService.findBySearch(param);
 
   }  
}
