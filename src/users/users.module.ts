import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
