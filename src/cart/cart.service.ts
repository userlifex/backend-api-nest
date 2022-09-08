import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { AddProductDTO } from './dto/add-product.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addProduct(addProductDto: AddProductDTO, userUuid: string) {
    const { productUuid, quantity } = addProductDto;

    const product = await this.prisma.product.findUnique({
      where: { uuid: productUuid },
    });

    if (product.stock - quantity < 0) {
      throw new UnprocessableEntityException('Out of stock');
    }

    const cartProduct = await this.prisma.cartProduct.create({
      data: {
        productUuid,
        quantity,
        userUuid,
      },
    });

    const productUpdated = await this.prisma.product.update({
      where: {
        uuid: product.uuid,
      },
      data: {
        stock: product.stock - quantity,
      },
    });

    return {
      ...cartProduct,
      product: productUpdated,
    };
    //return 'This action adds a new cart';
  }

  async findByUser(userUuid: string) {
    return this.prisma.cartProduct.findMany({
      where: {
        userUuid,
      },
      include: {
        product: true,
      },
    });
  }

  async removeCartProduct(cartProductUuid: string) {
    let proudctDeleted = null;

    console.log(cartProductUuid);
    await this.prisma.$transaction(async (prisma) => {
      const cartProduct = await prisma.cartProduct.findUnique({
        where: {
          uuid: cartProductUuid,
        },
      });

      const product = await prisma.product.findUnique({
        where: {
          uuid: cartProduct.productUuid,
        },
      });

      const productUpdated = await prisma.product.update({
        where: {
          uuid: cartProduct.productUuid,
        },
        data: {
          stock: product.stock + cartProduct.quantity,
        },
      });

      console.log({ product, productUpdated });

      proudctDeleted = await prisma.cartProduct.delete({
        where: { uuid: cartProduct.uuid },
      });
    });

    return proudctDeleted;
  }

  async clearCart(userUuid: string) {
    try {
      const cartItems = await this.prisma.cartProduct.findMany({
        where: {
          userUuid,
        },
      });

      for await (const item of cartItems) {
        const product = await this.prisma.product.findUnique({
          where: { uuid: item.productUuid },
        });

        const productUpdated = await this.prisma.product.update({
          where: { uuid: product.uuid },
          data: {
            stock: product.stock + item.quantity,
          },
        });

        console.log({ productUpdated });
      }

      console.log('here');
      return this.prisma.cartProduct.deleteMany({ where: { userUuid } });
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
