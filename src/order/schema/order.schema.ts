import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  user: string;

  @Prop({
    type: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: { type: Number, default: 1 }, // Add quantity
      },
    ],
  })
  products: { productId: string; name: string; price: number; quantity: number }[];

  @Prop({ required: true, default: 0 }) // Default to 0 to ensure it is always set
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
