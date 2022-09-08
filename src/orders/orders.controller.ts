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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req: any) {
    const { uuid } = req.user;
    return this.ordersService.createOrderWithUserUuid(uuid);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getByUser(@Request() req: any) {
    const { uuid } = req.user;
    return this.ordersService.findByUser(uuid);
  }
}
