import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prismaService.product.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  findOne(uuid: string) {
    return this.prismaService.product.findUnique({
      where: { uuid },
    });
    return `This action returns a #${uuid} product`;
  }

  update(uuid: string, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: {
        uuid,
      },
      data: {
        ...updateProductDto,
      },
    });
  }

  remove(uuid: string) {
    return this.prismaService.product.delete({ where: { uuid } });
  }
}
