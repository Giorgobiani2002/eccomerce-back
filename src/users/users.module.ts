import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema}]),
  JwtModule.register({
    secret: 'my-secret', 
    signOptions: { expiresIn: '1h' }, 
  }),
],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
