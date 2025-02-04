import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import * as bcrypt from 'bcryptjs';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, required: true, unique: true })
  userName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true }) // Password is required
  password: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'order', default: [] })
  order: MongooseSchema.Types.ObjectId[];
  

  
  
}

export const UserSchema = SchemaFactory.createForClass(User);


