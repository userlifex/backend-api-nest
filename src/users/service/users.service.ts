import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from '../../common/services';

@Injectable()
export class UsersService {
  private encryptedKey: string;
  constructor(private prisma: PrismaService) {
    this.encryptedKey = process.env.ENCRYPTION;
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...restCreateUserDto } = createUserDto;

    console.log({ bcrypt });
    const ecryptedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        ...restCreateUserDto,
        password: ecryptedPassword,
      },
    });
  }

  async me(uuid: string) {
    return this.prisma.user.findUnique({ where: { uuid } });
  }

  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(uuid: string) {
   return this.prisma.user.findUnique({ where: { uuid } });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const { id } = await this.prisma.user.findUnique({ where: { uuid } });

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  remove(uuid: string) {
    return this.prisma.user.delete({ where: { uuid } });
  }
}
