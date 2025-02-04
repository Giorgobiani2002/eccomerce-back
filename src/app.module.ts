import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@eccomerce.z2ivo.mongodb.net/?retryWrites=true&w=majority&appName=eccomerce',
    ),
    UsersModule,
    ProductsModule,
    OrderModule,
    CartModule,
    OrdersModule,
    WishlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
