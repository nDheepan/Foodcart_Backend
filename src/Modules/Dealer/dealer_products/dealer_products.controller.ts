import { Controller, Get, Post, Body, Patch, Param, Res,Delete, UseGuards, UnauthorizedException, UseInterceptors, UploadedFile,  HttpStatus, BadRequestException, InternalServerErrorException, UploadedFiles, Req, ParseFilePipe, ParseFilePipeBuilder,  } from '@nestjs/common';
import { DealerProductsService } from './dealer_products.service';
import { CreateDealerProductDto } from '../../../dtos/create-dealer_product.dto';
import { UpdateDealerProductDto } from '../../../dtos/update-dealer_product.dto';
import { jwtGuard } from 'src/Guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../../enum/role.enum';
import { RolesGuard } from 'src/Guards/roles.guard';
import { CreateCategoryDto } from '../../../dtos/create-category.dto';
import { UpdateCategoryDto } from 'src/dtos/update-category.dto';
import { CategoryService } from '../category/category.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {  extname } from 'path';
import { Request, Response } from 'express';
import { error } from 'console';
import * as multer from 'multer';
import * as fs from 'fs-extra';
import getVideoDurationInSeconds from 'get-video-duration';
@UseGuards(jwtGuard,RolesGuard)
@Roles(Role.ADMIN,Role.EMPLOYEE)
@Controller()
export class DealerProductsController {
  constructor(private readonly dealerProductsService : DealerProductsService,
    private readonly categoryService : CategoryService
    ) {}
    
    private generateRandomFilename(): string {
      const randomname =Array(10)
         .fill(null)
         .map(() => Math.round(Math.random() * 16).toString(16))
         .join('');
         return randomname;
     }
    @Post('create')
    async create(
      @Body() createDealerProductDto: CreateDealerProductDto,
      @Body() createCategoryDto: CreateCategoryDto,
      @Req() req: any,
      @Res() res: Response,
      @UploadedFile()file:Express.Multer.File
    ){

      const maximgsize = 2000000;  //2mb
      const maxvdosize = 10000000;  //10mb
      const maxSec = 30000;         //30sec
       
      let imagepath,videopath;
      createDealerProductDto.dealer = req.user.dealerid;
      
      const images = req.files['images'];
      const video  = req.files['shorts'];
      if(images){
        const imgext = extname(images.originalFilename);
        const imgname = `${this.generateRandomFilename()}${imgext}`;
        const imgDir =images.path;


        if(!['image/jpeg','image/png'].includes(images.type))
        {
         
          throw new BadRequestException('Invalid file type for image upload. Only JPEG and PNG images are allowed.');
               }
               else if (images.size > maximgsize ) {
          
                throw new BadRequestException('image size exceeds the specified limit insert image less then 2mb ');
              }
          else{
            const destinationimgDir = `/home/aiimtech05/projects/officework-multiauth/officeworkV1/officework/assets/images/${imgname}`;
            fs.move(imgDir, destinationimgDir, { overwrite: true }, err => {
              if (err) return console.error(err)
              console.log('image file uploaded in  directory successfully!')
            });
              imagepath = destinationimgDir;
          }
  }
   if(video){
    const vdoext = extname(video.originalFilename);
    const vdoname =`${this.generateRandomFilename()}${vdoext}`;    
    const vdoDir = video.path;   
    
    getVideoDurationInSeconds(video.path).then((duration) => {
      return duration;
    }).catch(err =>{});
  
    const duration = await getVideoDurationInSeconds(video.path) ;
  
    const durationsec = duration * 1000;
         
           if(!['video/mp4','video/quicktime'].includes(video.type))
            {           
              throw new BadRequestException('Invalid file type for video upload. Only mp4 and quicktime videos are allowed.');
            }
           
         
  
          else if (video.size > maxvdosize ) {
            throw new BadRequestException('video size exceeds the specified limit insert video less then 10mb ');
            }
           
          else if(durationsec > maxSec){
            
              throw new BadRequestException('video duration exceeds the maximum limit upload upto 30sec');
            }
  
            else{
            const destinationvdoDir = `/home/aiimtech05/projects/officework-multiauth/officeworkV1/officework/assets/shorts/${vdoname}`;
            fs.move(vdoDir, destinationvdoDir, { overwrite: true }, err => {
              if (err) return console.error(err)
              console.log('video file uploaded in directory successfully !')
            });
  
              videopath = destinationvdoDir;
  }
}
  createDealerProductDto.images = imagepath;
  createDealerProductDto.shorts = videopath;


          const item = await this.dealerProductsService.create(createDealerProductDto);
          const category = await this.dealerProductsService.createCategory(item.id, createCategoryDto);
          
      if (item && category) {
        return res.status(HttpStatus.OK).json({ message: 'Records added successfully' });
      } else if (item || category) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Item or category' });
      } else {
        throw new BadRequestException('No results found');
      }
    
          }
  @Get()
  async findAll(@Req() req) {
    const id = req.user.dealerid;
    return this.dealerProductsService.findAll(id);
  }

  @Get(':id')

  async findOne(@Param('id') id: number,@Req()req) {
    const dealerid = req.user.dealerid;
    return this.dealerProductsService.findOne(id,dealerid);  
  }


  @Patch(':id')
    async update(@Param('id') id: number,@UploadedFile()file:Express.Multer.File,
    @Req() req : any,
    @Res() res:Response, @Body() updateDealerProductDto: UpdateDealerProductDto,@Body()  updateCategoryDto:UpdateCategoryDto) {
    
      const images = req.files['images'];
      const video  = req.files['shorts'];
      const imgext = extname(images.originalFilename);
      const imgname = `${this.generateRandomFilename()}${imgext}`;
      const vdoext = extname(video.originalFilename);
      const vdoname =`${this.generateRandomFilename()}${vdoext}`;    
      const imgDir =images.path;
      const vdoDir = video.path;   
      getVideoDurationInSeconds(video.path).then((duration) => {
        return duration;
      }).catch(err =>{});

      const duration = await getVideoDurationInSeconds(video.path) ;
      const maximgsize = 2000000;
      const maxvdosize = 20000000;
      const maxSec = 30000;
      const durationsec = duration * 1000;
        if(!['image/jpeg','image/png'].includes(images.type))
        {
          throw new BadRequestException('Invalid file type for image upload. Only JPEG and PNG images are allowed.');
        }
        else if(!['video/mp4','video/quicktime'].includes(video.type))
          {
            throw new BadRequestException('Invalid file type for video upload. Only mp4 and quicktime videos are allowed.');
          }
        
        else if (images.size > maximgsize ) {
            throw new BadRequestException('image size exceeds the specified limit insert image less then 2mb ');
          }

        else if (video.size > maxvdosize ) {
            throw new BadRequestException('video size exceeds the specified limit insert video less then 10mb ');
          }
          

        else if(durationsec > maxSec){
            throw new BadRequestException('video duration exceeds the maximum limit upload upto 30sec');
          }

          else{
          const destinationimgDir = `/home/aiimtech05/projects/officework-multiauth/officework/assets/images/${imgname}`;
          fs.move(imgDir, destinationimgDir, { overwrite: true }, err => {
            if (err) return console.error(err)
            console.log('image file uploaded in  directory successfully!')
          });

          updateDealerProductDto.images = destinationimgDir;   
          const destinationvdoDir = `//home/aiimtech05/projects/officework-multiauth/officework/assets/shorts/${vdoname}`
          fs.move(vdoDir, destinationvdoDir, { overwrite: true }, err => {
            if (err) return console.error(err)
            console.log('video file uploaded in directory successfully !')
          });

          updateDealerProductDto.shorts = destinationvdoDir; 
    
    const item =await this.dealerProductsService.update(id, updateDealerProductDto);
    const category_id = item.categoryid;
    const category =await  this.categoryService.update(category_id,updateCategoryDto)
    try{
    if(item && category){
      return res.status(HttpStatus.OK).json({item});
    }
    else{
      throw new InternalServerErrorException();
    }
    }
    catch(error){
      throw new UnauthorizedException();
    }

    }
  }
  @Delete(':id')
    async remove(@Param('id') id: number,@Res() res:Response) {
      const item = await this.dealerProductsService.remove(+id);
      const c_id = item.categoryid;
      const category = await this.dealerProductsService.Categoryremove(c_id)
      try{
      if(item && category ){
        res.status(HttpStatus.OK).json({message:"item and category deleted successfully"})

      }
      else{
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({messsage:"item or category missing"})
        
      }
    }
    catch(error){
        throw new UnauthorizedException();
    }
    }

}
