import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateCategoryDto } from '../../../dtos/create-category.dto';
import { UpdateCategoryDto } from '../../../dtos/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category)
  private readonly categoryRepo:Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto) {
    const result = await this.categoryRepo.save(createCategoryDto);
        if(result){return result;}
        else{throw new BadRequestException()}
  }

  async findAll() {
    const productquerybuider = await this.categoryRepo.createQueryBuilder("category");
    const result = await productquerybuider
                   .getMany();
    if(!result){throw new BadRequestException("category not found")}
    else{
      return result;
    }
  }

  async findOne(id: number) {
    const productquerybuider = await this.categoryRepo.createQueryBuilder("category");
    const result = await productquerybuider
                   .where("category.id = :id",{id})
                   .select(["category.id","category.dealermenuId","category.type",
                   "category.category","category.preference","category.cuisine"])
                   .getRawOne();
    if(!result){throw new UnauthorizedException("category not found")}
    else{
      return result;
    }  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {

    const result = await this.categoryRepo.update(id,updateCategoryDto)
    
    if(!result){throw new UnauthorizedException()}
    else{
    return this.categoryRepo.update(id,updateCategoryDto);
    }
  }

   async  remove(id: number) {
    const productquerybuider = await this.categoryRepo.createQueryBuilder("category");
    const result = await productquerybuider
              .delete()
              .from(Category)
              .where("category.id = :id",{id:id})
              .execute();
    if(result){
    return result;
    }
    else{
      throw new InternalServerErrorException()
    }
}}