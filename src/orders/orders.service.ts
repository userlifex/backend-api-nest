import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrderWithUserUuid(userUuid: string) {
    let result = null;

    const cartProduct = await this.prisma.cartProduct.count({
      where: { userUuid },
    });

    if (cartProduct === 0) throw new UnprocessableEntityException('Emtpy cart');
    await this.prisma.$transaction(async (prismaTransaction) => {
      let total = 0;

      const cartProduct = await prismaTransaction.cartProduct.findMany({
        where: { userUuid },
        include: {
          product: true,
        },
      });

      for await (const item of cartProduct) {
        const { quantity, product } = item;
        const subTotal = quantity * product.price;
        total += subTotal;
      }

      const order = await prismaTransaction.order.create({
        data: {
          total,
          userUuid,
        },
      });

      await prismaTransaction.orderProduct.createMany({
        data: cartProduct.map((item) => ({
          orderUuid: order.uuid,
          productUuid: item.productUuid,
          quantity: item.quantity,
          salePrice: item.product.price,
        })),
      });

      result = await prismaTransaction.cartProduct.deleteMany({
        where: { userUuid },
      });
    });
    return result;
  }

  findByUser(userUuid: string) {
    return this.prisma.order.findMany({
      where: { userUuid },
      include: {
        products: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
