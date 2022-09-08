import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/common/services';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
})
export class CartModule {}
