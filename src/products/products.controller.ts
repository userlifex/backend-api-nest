import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.productsService.findOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(uuid, updateProductDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.productsService.remove(uuid);
  }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          console.log('cb', file, cb);
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log({ file });
    return 'Uploading image to';
  }
}
