import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

//!და კოლექციები
//უნდა ქონდეს products
//უნდა ქონდეს Wishlist ეს ის გულები ორა
//უნდა ქონდეს cart-ი
//და ორდერბი orders //შელვეთილები

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  yourName: string;

  @Prop({ type: String })
  userName: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'product', default: [] })
  product: mongoose.Schema.Types.ObjectId[];
}

export const userSchema = SchemaFactory.createForClass(User);
