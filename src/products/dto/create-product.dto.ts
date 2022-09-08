import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  readonly stock: number;

  @IsString()
  @IsNotEmpty()
  readonly imgUrl: string;
}
