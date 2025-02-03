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

  
  // async comparePassword(enteredPassword: string): Promise<boolean> {
  //   return bcrypt.compare(enteredPassword, this.password);
  // }
}

export const UserSchema = SchemaFactory.createForClass(User);


// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

//es raaru? anu sxva bcriptit uheshavdi parols users da magito ar mushobda mere bcryptis compare