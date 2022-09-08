import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CartService } from './cart.service';
import { AddProductDTO } from './dto/add-product.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add-product')
  @UseGuards(JwtAuthGuard)
  addProduct(@Body() addProductDto: AddProductDTO, @Request() req: any) {
    console.log('El carrito quiere actualizar');
    const { uuid } = req.user;
    return this.cartService.addProduct(addProductDto, uuid);
  }

  @Delete('/delete-product/:uuid')
  @UseGuards(JwtAuthGuard)
  removeProduct(@Param('uuid') cartProductUuid: string) {
    return this.cartService.removeCartProduct(cartProductUuid);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getCart(@Request() req: any) {
    const { uuid } = req.user;
    return this.cartService.findByUser(uuid);
  }

  @Post('clear')
  @UseGuards(JwtAuthGuard)
  clear(@Request() req: any) {
    const { uuid } = req.user;
    return this.cartService.clearCart(uuid);
  }
}
