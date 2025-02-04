import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  products: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }[];
}
