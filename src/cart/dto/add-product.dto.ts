import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class AddProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly productUuid: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;
}
