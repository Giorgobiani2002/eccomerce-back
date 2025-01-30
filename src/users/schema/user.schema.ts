import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

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
