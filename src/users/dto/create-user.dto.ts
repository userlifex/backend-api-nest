import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly address?: string;

  @IsEnum(RoleEnum)
  readonly role: string;
}
